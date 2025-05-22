
function getCSRFToken() {
    let name = 'csrftoken';
    let cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        let c = cookie.trim();
        if (c.startsWith(name + '=')) {
            return decodeURIComponent(c.substring(name.length + 1));
        }
    }
    return '';
}


document.getElementById("delete_btn").addEventListener("click", function (e) {
    e.preventDefault();

    const checkboxes = document.querySelectorAll(".checkbox:checked");

    const selectedIds = Array.from(document.querySelectorAll("#commodity-dashboard-table .checkbox:checked"))
        .filter(cb => cb.id !== "select-all")
        .map(cb => cb.value);


    if (selectedIds.length === 0) {
        Swal.fire({
            title: 'No selection',
            text: 'Please select at least one waste group to delete.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return;
    }

    // Show a confirmation message
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            // Send the delete request
            fetch('/commodities/delete/', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCSRFToken(), // function below
                    },
                    body: JSON.stringify({
                        commodity_ids: selectedIds
                    })
                })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        // Remove the deleted rows from the table
                        checkboxes.forEach((checkbox) => {
                            if (checkbox.checked) {
                                checkbox.closest("tr").remove();
                            }
                        });

                        Swal.fire({
                            title: "Deleted!",
                            text: "The selected Commmodities have been deleted.",
                            icon: "success",
                            confirmButtonText: 'OK'
                        });
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: "Failed to delete selected waste groups.",
                            icon: "error",
                            confirmButtonText: 'OK'
                        });
                    }
                })
                .catch((err) => {
                    console.error("Error: ", err);
                    Swal.fire({
                        title: "Error",
                        text: "An unexpected error occurred while deleting.",
                        icon: "error",
                        confirmButtonText: 'OK'
                    });
                });
        }
    });
});