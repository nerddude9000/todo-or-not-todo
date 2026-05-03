<?php

declare(strict_types=1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// for browser
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	http_response_code(200);
	exit();
}

try {
	// connect to db
	$pdo = new PDO('sqlite:' . __DIR__ . '/tasks.db');
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
	http_response_code(500);
	echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
	exit();
}

// accept json
$input = json_decode(file_get_contents('php://input'), true);
$method = $_SERVER['REQUEST_METHOD'];

// get resource from url parameter
$resource = $_GET['resource'] ?? '';
if ($resource === 'lists') {
	handleLists($method, $pdo, $input);
} else if ($resource === 'tasks') {
	handleTasks($method, $pdo, $input);
} else {
	http_response_code(400);
	echo json_encode(["error" => "Invalid resource"]);
}

function handleLists(string $method, PDO $pdo, ?array $input)
{
	switch ($method) {
		case 'GET':
			// get all lists
			echo json_encode($pdo->query("SELECT * FROM lists")->fetchAll(PDO::FETCH_ASSOC));
			break;
		case 'POST':
			// Add new list
			$stmt = $pdo->prepare("INSERT INTO lists (title) VALUES (?)");
			$stmt->execute([$input['title'] ?? "My new project"]);
			echo json_encode(["id" => $pdo->lastInsertId(), "title" => $input['title']]);
			break;
		case 'DELETE':
			// delete list
			$stmt = $pdo->prepare("DELETE FROM lists WHERE id = ?");
			$stmt->execute([$input['id'] ?? $_GET['id']]);
			echo json_encode(["success" => true]);
			break;
		case 'PUT':
			// update list
			if (!isset($input['id'])) {
				http_response_code(400);
				echo json_encode(["error" => "list_id is required"]);
				exit();
			}

			// Fetch current task to safely update only provided fields
			$stmt = $pdo->prepare("SELECT * FROM lists WHERE id = :id");
			$stmt->execute(['id' => $input['id']]);
			$currentList = $stmt->fetch(PDO::FETCH_ASSOC);

			if (!$currentList) {
				http_response_code(404);
				echo json_encode(["error" => "List not found"]);
				exit();
			}

			$title = isset($input['title']) ? trim($input['title']) : $currentList['title'];

			$updateStmt = $pdo->prepare("UPDATE lists SET title = :title WHERE id = :id");
			$updateStmt->execute([
				'id' => $input['id'],
				'title' => $title,
			]);

			echo json_encode(["message" => "List updated successfully"]);
			break;
	}
}

function handleTasks(string $method, PDO $pdo, ?array $input)
{
	switch ($method) {
		case 'GET': // get all tasks in list
			if (!isset($_GET['list_id'])) {
				http_response_code(400);
				echo json_encode(["error" => "list_id is required in url parameter"]);
				exit();
			}

			$stmt = $pdo->prepare("SELECT * FROM tasks WHERE list_id = :list_id ORDER BY id DESC");
			$stmt->execute(['list_id' => $_GET['list_id']]);
			$tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

			// SQLite uses int for done, so we cast it here to bool
			foreach ($tasks as &$task) {
				$task['done'] = (bool)$task['done'];
			}

			echo json_encode($tasks);
			break;

		case 'POST': // Create new task
			if (!isset($input['list_id'])) {
				http_response_code(400);
				echo json_encode(["error" => "list_id is required"]);
				exit();
			}

			$stmt = $pdo->prepare("INSERT INTO tasks (name, done, list_id) VALUES (:name, 0, :list_id)");
			$name = $input['name'] ? trim($input['name']) : "New Task";
			$stmt->execute(['name' => $name, 'list_id' => $input['list_id']]);

			// Return the newly created task
			$newTask = [
				'id' => (int)$pdo->lastInsertId(),
				'name' => $name,
				'list_id' => (int)($input['list_id']),
				'done' => false
			];

			http_response_code(201);
			echo json_encode($newTask);
			break;

		case 'PUT': // Update task (done, or edit name)
			if (!isset($input['id'])) {
				http_response_code(400);
				echo json_encode(["error" => "Task ID is required"]);
				exit();
			}

			// Fetch current task to safely update only provided fields
			$stmt = $pdo->prepare("SELECT * FROM tasks WHERE id = :id");
			$stmt->execute(['id' => $input['id']]);
			$currentTask = $stmt->fetch(PDO::FETCH_ASSOC);

			if (!$currentTask) {
				http_response_code(404);
				echo json_encode(["error" => "Task not found"]);
				exit();
			}

			$name = isset($input['name']) ? trim($input['name']) : $currentTask['name'];
			$done = isset($input['done']) ? (int)$input['done'] : $currentTask['done'];

			$updateStmt = $pdo->prepare("UPDATE tasks SET name = :name, done = :done WHERE id = :id");
			$updateStmt->execute([
				'name' => $name,
				'done' => $done,
				'id' => $input['id']
			]);

			echo json_encode(["message" => "Task updated successfully"]);
			break;

		case 'DELETE':
			// We look for ID in the JSON body, or in the URL like api.php?id=1
			$id = $input['id'] ?? $_GET['id'] ?? null;

			if (!$id) {
				http_response_code(400);
				echo json_encode(["error" => "Task ID is required"]);
				exit();
			}

			$stmt = $pdo->prepare("DELETE FROM tasks WHERE id = :id");
			$stmt->execute(['id' => $id]);

			echo json_encode(["message" => "Task deleted successfully"]);
			break;

		default:
			http_response_code(405);
			echo json_encode(["error" => "Method not allowed"]);
			break;
	}
}
