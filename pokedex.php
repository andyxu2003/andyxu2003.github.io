<?php
// Establish a database connection
$host = 'localhost';
$username = 'uwaerk2zmgkkn';
$password = 'xgzg0am1i0lu';
$database = 'db6sbokgbujqtl';

$conn = mysqli_connect($host, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Handle item click events
if (isset($_POST['item_id']) && isset($_POST['completed'])) {
    $itemId = $_POST['item_id'];
    $completed = $_POST['completed'];

    // Update the completed state in the database
    $sql = "UPDATE items SET completed = $completed WHERE id = $itemId";
    mysqli_query($conn, $sql);

    // Fetch the updated completed state from the database
    $sql = "SELECT completed FROM items WHERE id = $itemId";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($result);
    $completed = $row['completed'];

    // Return the updated completed state as JSON
    header('Content-Type: application/json');
    echo json_encode(['completed' => $completed]);
    exit();
}

// Handle new item form submission
if (isset($_POST['new_item'])) {
    $itemName = $_POST['new_item'];

    // Insert the new item into the database
    $sql = "INSERT INTO items (name, completed) VALUES ('$itemName', 0)";
    mysqli_query($conn, $sql);
}

// Fetch all items from the database
$sql = "SELECT id, name, completed, image FROM items";
$result = mysqli_query($conn, $sql);
$items = mysqli_fetch_all($result, MYSQLI_ASSOC);

// Calculate the total number of items and the number of completed items
$totalItems = count($items);
$completedItems = 0;
foreach ($items as $item) {
    if ($item['completed'] == 1) {
        $completedItems++;
    }
}

// Calculate the progress percentage
$progressPercentage = ($totalItems > 0) ? round(($completedItems / $totalItems) * 100) : 0;

// Close the database connection
mysqli_close($conn);
?>

<!DOCTYPE html>
<html>

<head>
    <title>List Tracker</title>
    <style>
        body {
            font-family: "Arial", sans-serif;
            background-color: #C1E1C1;
        }

        .container {
            margin: 0 15%;
            background-color: #e8f3ed;
            box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
            border-radius: 10px;
        }

        table {
            border-collapse: collapse;
            width: 100%;
        }

        th,
        td {
            padding: 8px;
            text-align: center;
            border-bottom: 1px solid lightgray;
        }

        .completed label {
            text-decoration: line-through;
        }

        .item-image {
            max-width: 100px;
            max-height: 100px;
        }

        .checkbox-column {
            width: 8%;
            text-align: center;
        }

        .checkbox {
            width: 20px;
            height: 20px;
            border-radius: 0;
            outline: none;
        }

        .id-column {
            width: 10%;
            text-align: center;
        }

        .image-column {
            width: 20%;
        }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function() {
            // Handle checkbox click events
            $('input[type="checkbox"]').on('click', function() {
                var checkbox = $(this);
                var item_id = checkbox.closest('tr').find('input[name="item_id"]').val();
                var completed = checkbox.is(':checked') ? 1 : 0;

                // Update the completion status via AJAX
                $.ajax({
                    type: 'POST',
                    url: '',
                    data: {
                        item_id: item_id,
                        completed: completed
                    },
                    dataType: 'json',
                    success: function(response) {
                        if (response.completed == 1) {
                            checkbox.closest('label').addClass('completed');
                        } else {
                            checkbox.closest('label').removeClass('completed');
                        }
                        updateProgress();
                    }
                });
            });

            // Function to update the progress bar and counter
            function updateProgress() {
                var totalItems = <?php echo $totalItems; ?>;
                var completedItems = <?php echo $completedItems; ?>;
                var progressPercentage = (totalItems > 0) ? Math.round((completedItems / totalItems) * 100) : 0;

                $('.progress-bar-inner').css('width', progressPercentage + '%');
                $('.progress-text').text(completedItems + ' / ' + totalItems + ' completed');
            }

            updateProgress(); // Initial progress update
        });
    </script>
</head>

<body>
    <div class="container">
        <table>
            <tr>
                <th></th>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
            </tr>
            <?php foreach ($items as $item) : ?>
                <tr>
                    <td class="checkbox-column">
                        <input type="hidden" name="item_id" value="<?php echo $item['id']; ?>">
                        <input class="checkbox" type="checkbox" name="completed" value="1" <?php echo ($item['completed'] == 1) ? 'checked' : ''; ?>>
                    </td>
                    <td class="id-column"><?php echo $item['id']; ?></td>
                    <td class="image-column">
                        <?php if (!empty($item['image'])) : ?>
                            <img src="<?php echo $item['image']; ?>" alt="Item Image" class="item-image">
                        <?php endif; ?>
                    </td>
                    <td class="name-column">
                        <label <?php echo ($item['completed'] == 1) ? 'class="completed"' : ''; ?>>
                            <?php echo $item['name']; ?>
                        </label>
                    </td>
                </tr>
            <?php endforeach; ?>
        </table>
    </div>
</body>

</html>