var grid = [

    0, 0, 0,
    0, 0, 0,
    0, 0, 0

];


var victory_pos = {
    "U": [[0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]],

    "C": [[0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]]
};

var emptyPositions = [

    0, 1, 2,
    3, 4, 5,
    6, 7, 8

];


function page_refresh() {
    document.location.reload();
}

function generateTable() {
    var _myTable = document.createElement("table");
    _myTable.setAttribute("id", "myTable");

    document.body.appendChild(_myTable);

    var _tbody = document.getElementById("myTable").getElementsByTagName("tbody")[0];

    var id_count = 0;

    for (var i = 0; i < 3; i++) {
        var _row = _myTable.insertRow(i);
        for (var j = 0; j < 3; j++) {

            var _cell = _row.insertCell(j);
            _cell.className = "_cell";
            _cell.setAttribute("id", id_count);
            _cell.addEventListener("click", user_move, "false");
            _cell.classList.add("not_clicked");
            id_count++;
        }

        _myTable.appendChild(_row);
    }

    var _refresh = document.createElement("button");
    _refresh.innerHTML = "<h3>Restart Game</h3>";
    _refresh.setAttribute("id", "refresh_btn");
    _refresh.setAttribute("onclick", "page_refresh()");

    document.body.appendChild(_refresh);


    var _vicBanner = document.createElement("h2");
    _vicBanner.setAttribute("id", "vicBanner");
    _vicBanner.innerHTML = "";
    document.body.appendChild(_vicBanner);


}


function user_move(event) {
    console.log("human: " + event.target.id);
    grid[parseInt(event.target.id)] = "U";
    //event.target.style.background = "red";
    event.target.innerHTML = "X";
    event.target.style.fontFamily = "'Baloo', cursive";
    event.target.style.fontWeight = "600";
    event.target.style.color = "#f87e04";
    event.target.classList.remove("not_clicked");
    event.target.classList.add("user_clicked");
    event.target.removeEventListener("click", user_move, "false");

    var table = document.getElementById("myTable"),
        rIndex, cIndex;

    // table rows
    for (var i = 0; i < table.rows.length; i++) {
        // row cells
        for (var j = 0; j < table.rows[i].cells.length; j++) {

            // returns parent row element of the clicked cell element
            rIndex = event.target.parentElement.rowIndex + 1;
            cIndex = event.target.cellIndex + 1;
            console.log("Row : " + rIndex + " , Cell : " + cIndex);

        }
    }

    var gameOver = checkVictory("U");

    if (!gameOver) {
        computer_Move();

        checkVictory("C");
    }
}

function computer_Move() {
    console.log("inside computer move");
    var bestPos = evaluateMoves();

    if (bestPos == -1) {
        console.log("Draw");
    } else {

        grid[bestPos] = "C";
        var _ComputerClick = document.getElementsByTagName("td")[bestPos];
        _ComputerClick.classList.remove("not_clicked");
        _ComputerClick.classList.add("computer_clicked");
        _ComputerClick.removeEventListener("click", user_move, "false");
        _ComputerClick.innerHTML = "O";
        _ComputerClick.style.fontWeight = "600";
        _ComputerClick.style.color = "#3ebbdd";
    }

}

function evaluateMoves() {

    var potential = 0;
    var max_potential = 0;
    var max_potential_combo;
    var best_pos;
    var empty_pos;
    var best_empty_pos;


    for (var i = 0; i < victory_pos["C"].length; i++) {
        console.log(victory_pos["C"]);
        for (var j = 0; j < 3; j++) {
            // eliminate computer victory positions occupied by user
            if (grid[victory_pos["C"][i][j]] == "U") {
                console.log("*****user position detected i: " + victory_pos["C"][i][j]);
                console.log(victory_pos["C"]);
                emptyPositions.splice(victory_pos["C"][i][j], 1);
                victory_pos["C"].splice(i, 1);
                console.log(victory_pos["C"]);
                i--;



                break;
            }

        }

    }


    for (var i = 0; i < victory_pos["C"].length; i++) {
        potential = 0;
        empty_pos = 0;

        for (var j = 0; j < 3; j++) {
            // measure potential of remaining positions 
            if (grid[victory_pos["C"][i][j]] == "0") {
                console.log("*****empty position detected i: " + victory_pos["C"][i][j]);
                empty_pos = j;
                //potential++;
            } else if (grid[victory_pos["C"][i][j]] == "C") {
                console.log("*****computer position detected i: " + victory_pos["C"][i][j]);
                emptyPositions.splice(victory_pos["C"][i][j], 1);
                potential++;
            }
        }

        console.log("potential: " + potential);
        console.log("max_potential: " + max_potential);
        console.log("empty_pos: " + empty_pos);

        // Find best potential
        if (potential >= max_potential) {
            max_potential = potential;
            max_potential_combo = i;
            best_empty_pos = empty_pos;

            console.log("max_potential_combo " + max_potential_combo);
            console.log("best_empty_pos " + best_empty_pos);
        }
    }


    if (victory_pos["C"].length == 0 && emptyPositions.length == 0) {
        console.log("Draw");
        return -1;
    } else if (victory_pos["C"].length == 0 && emptyPositions.length != 0) {
        return emptyPositions[0];
    } else {
        var best_pos = victory_pos["C"][max_potential_combo][best_empty_pos];

        console.log("Best position is: " + best_pos);

        return best_pos;

    }





}

function flashVictoryMessage(i, player) {
    if (player == "U") {
        //console.log("User Wins");
        document.getElementById("vicBanner").innerHTML = "You Win!";
    } else {
        //console.log("Computer Wins");
        document.getElementById("vicBanner").innerHTML = "Sorry! You Lose";
    }

    var _cells = document.getElementsByTagName("td");

    for (var k = 0; k < 3; k++) {
        _cells[victory_pos[player][i][k]].classList.remove("user_clicked");
        _cells[victory_pos[player][i][k]].classList.remove("computer_clicked");
        _cells[victory_pos[player][i][k]].classList.add("victory_" + player);
        _cells[victory_pos[player][i][k]].style.color = "white";
    }
}

function checkVictory(player) {

    console.log("inside victory check");
    for (var i = 0; i < victory_pos[player].length; i++) {
        if (grid[victory_pos[player][i][0]] == player && grid[victory_pos[player][i][1]] == player && grid[victory_pos[player][i][2]] == player) {

            flashVictoryMessage(i, player);

            // ref: https://stackoverflow.com/questions/19469881/remove-all-event-listeners-of-specific-type/19470348
            var _myTable = document.getElementById("myTable"),
                _myTableClone = _myTable.cloneNode(true);
            _myTable.parentNode.replaceChild(_myTableClone, _myTable);

            return true;
        }
    }


}


generateTable();
