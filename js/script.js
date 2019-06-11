var count = 0;

var victory_state = new Boolean(false);

var grid = [

    0, 0, 0,
    0, 0, 0,
    0, 0, 0

];



function getID(e) {
    e = e || window.event;
    e = e.target || e.srcElement;
    return e.id;
}






document.addEventListener("click", function (event) {



    // console.log("VICTORY STATUS: " + victory_state);


    target_id = getID(event);

    console.log("Reprinting ID: " + target_id);

    if (event.target.classList.contains("square")) {

        if (event.target.classList.contains("buttonClicked")) {
            //event.target.classList.remove("buttonClicked");

            //document.getElementById(target_id).getElementsByClassName("cross")[0].style.visibility = "hidden";


        } else {
            event.target.classList.add("buttonClicked");
            document.getElementById(target_id).getElementsByClassName("cross")[0].style.visibility = "visible";
        }

        count++;

        array_Update();
        victory_state = victory_check();
        // console.log("victory_state: " + victory_state.toString());





        PC_move();




    }






});

document.addEventListener("mouseover", function (event) {


    target_id = getID(event);

    if (event.target.classList.contains("square_PC") || event.target.classList.contains("buttonClicked")) {
        document.getElementById(target_id).style.cursor = "default";

    } else {
        document.getElementById(target_id).style.cursor = "pointer";
    }


});

function victory_check() {

    var user_count = 0;
    var PC_count = 0;
    var k = 0;


    // ******************* HORIZONTAL CHECK **********************

    // check if row has 0s or 2s
    var i;
    for (i = 0; i <= 6; i += 3) {

        user_count = 0;
        PC_count = 0;
        k = 0;

        //console.log("i: " + i);
        //console.log("empty positions: ");

        var j;
        for (j = 0; j <= 2; j++) {
            //console.log("i+j: " + (i + j));
            if (grid[i + j] == 1) {
                user_count++;
                k = i + j;
                //console.log("Position(" + k + "): " + "Empty");
            } else if (grid[i + j] == 2) {
                PC_count++;
                //console.log("Position(" + k + "): " + "PC");
            }
        }

        console.log("------------------");

        if (user_count == 3) {
            console.log("User Wins! - Horizontal");
            document.getElementById("victory_banner").innerHTML = "User Wins!";
            return true;
        } else if (PC_count == 3) {
            console.log("PC Wins! - Horizontal");
            document.getElementById("victory_banner").innerHTML = "PC Wins!";
            return true;
        }


    }

    // ******************* VERTICAL CHECK **********************
    for (i = 0; i <= 2; i++) {

        user_count = 0;
        PC_count = 0;
        k = 0;

        //console.log("i: " + i);

        //console.log("empty positions: ");

        var j;
        for (j = 0; j <= 6; j += 3) {
            //console.log("i+j: " + (i + j));
            if (grid[i + j] == 1) {
                user_count++;
                k = i + j;
                //console.log("Position(" + k + "): " + "Empty");
            } else if (grid[i + j] == 2) {
                PC_count++;
                //console.log("Position(" + k + "): " + "PC");
            }
        }

        console.log("------------------");

        if (user_count == 3) {
            console.log("User Wins! - Vertical");
            document.getElementById("victory_banner").innerHTML = "User Wins!";
            return true;
        } else if (PC_count == 3) {
            console.log("PC Wins! - Vertical");
            document.getElementById("victory_banner").innerHTML = "PC Wins!";
            return true;
        }


    }

    // ******************* DIAGONAL CHECK ***********************

    var k = 0;
    var a = 0;

    var first = [0, 2];
    var inc = [4, 2];
    var last = [8, 4];


    // check if row has 0s or 2s

    for (var i = 0; i <= 2; i += 2) {

        user_count = 0;
        PC_count = 0;
        k = 0;

        //console.log("i: " + i);

        //console.log("empty positions: ");


        //console.log("Last: " + last[a]);
        //console.log("Inc: " + inc[a]);

        for (var j = 0; j <= last[a]; j += inc[a]) {
            //console.log("i+j: " + (i + j));
            if (grid[i + j] == 1) {
                user_count++;
                k = i + j;
                //console.log("Position(" + k + "): " + "Empty");
            } else if (grid[i + j] == 2) {
                PC_count++;
                //console.log("Position(" + k + "): " + "PC");
            }
        }

        //console.log("*************************");

        if (user_count == 3) {
            console.log("User Wins! - Diagonal");
            document.getElementById("victory_banner").innerHTML = "User Wins!";
            return true;
        } else if (PC_count == 3) {
            console.log("PC Wins! - Diagonal");
            document.getElementById("victory_banner").innerHTML = "PC Wins!";
            return true;
        }

        a++;


    }




}


function horz_check() {


    //console.log(grid);
    //console.log("Horizontal Position: ")

    var empty_count = 0;
    var PC_count = 0;
    var k = 0;
    var horz_size = 0;


    // check if row has 0s or 2s
    var i;
    for (i = 0; i <= 6; i += 3) {

        empty_count = 0;
        PC_count = 0;
        horz_size = 0;
        k = 0;

        //console.log("i: " + i);

        //console.log("empty positions: ");

        var j;
        for (j = 0; j <= 2; j++) {
            //console.log("i+j: " + (i + j));
            if (grid[i + j] == 0) {
                empty_count++;
                k = i + j;
                //console.log("Position(" + k + "): " + "Empty");
            } else if (grid[i + j] == 2) {
                PC_count++;
                horz_size++;
                //console.log("Position(" + k + "): " + "PC");
            }
        }

        console.log("------------------");

        if ((empty_count == 3) || (empty_count == 2 && PC_count == 1) || (empty_count == 1 && PC_count == 2)) {
            return [horz_size, k];
        }


    }

    return [0, -1];


}


function diag_check() {


    //console.log(grid);
    //console.log("Vertical Position: ")

    var empty_count = 0;
    var PC_count = 0;
    var k = 0;
    var a = 0;
    var diag_size = 0;

    var first = [0, 2];
    var inc = [4, 2];
    var last = [8, 4];


    // check if row has 0s or 2s

    for (var i = 0; i <= 2; i += 2) {

        empty_count = 0;
        PC_count = 0;
        diag_size = 0;
        k = 0;

        //console.log("i: " + i);

        //console.log("empty positions: ");


        //console.log("Last: " + last[a]);
        //console.log("Inc: " + inc[a]);

        for (var j = 0; j <= last[a]; j += inc[a]) {
            //console.log("i+j: " + (i + j));
            if (grid[i + j] == 0) {
                empty_count++;
                k = i + j;
                //console.log("Position(" + k + "): " + "Empty");
            } else if (grid[i + j] == 2) {
                PC_count++;
                diag_size++;
                //console.log("Position(" + k + "): " + "PC");
            }
        }

        //console.log("*************************");

        if ((empty_count == 3) || (empty_count == 2 && PC_count == 1) || (empty_count == 1 && PC_count == 2)) {
            return [diag_size, k];

        }

        a++;


    }

    console.log("------------------");

    return [0, -1];


}


function vert_check() {


    //console.log(grid);
    //console.log("Diagonal Position: ")

    var empty_count = 0;
    var PC_count = 0;
    var k = 0;
    var vert_size = 0;


    // check if row has 0s or 2s
    var i;
    for (i = 0; i <= 2; i++) {

        empty_count = 0;
        PC_count = 0;
        vert_size = 0;
        k = 0;

        //console.log("i: " + i);

        //console.log("empty positions: ");

        var j;
        for (j = 0; j <= 6; j += 3) {
            //console.log("i+j: " + (i + j));
            if (grid[i + j] == 0) {
                empty_count++;
                k = i + j;
                //console.log("Position(" + k + "): " + "Empty");
            } else if (grid[i + j] == 2) {
                PC_count++;
                vert_size++;
                //console.log("Position(" + k + "): " + "PC");
            }
        }

        console.log("------------------");

        if ((empty_count == 3) || (empty_count == 2 && PC_count == 1) || (empty_count == 1 && PC_count == 2)) {
            return [vert_size, k];

        }


    }

    return [0, -1];


}


function array_Update() {



    for (i = 0; i <= 8; i++) {


        // check if square filled by user
        if (document.getElementsByClassName("square")[i].classList.contains("buttonClicked")) {
            grid[i] = 1;
        }

        // check if square filled by PC
        else if (document.getElementsByClassName("square")[i].classList.contains("square_PC")) {
            grid[i] = 2;
        }

        // check if square empty
        else if (!document.getElementsByClassName("square")[i].classList.contains("buttonClicked") && !document.getElementsByClassName("square")[i].classList.contains("square_PC")) {
            grid[i] = 0;
        }


    }

    // console.log(grid);

}


function PC_move() {

    ep1 = horz_check();
    ep2 = vert_check();
    ep3 = diag_check();

    EP = [ep1, ep2, ep3];

    var beta = 0;


    var max_check = ["", "", ""];
    for (var i = 0; i <= 2; i++) {
        max_check[i] = EP[i][0];
    }

    console.log(EP);
    console.log(max_check);

    console.log("RUNTHROUGH");

    var max_size = Math.max.apply(null, max_check);
    beta = max_check.indexOf(max_size);

    console.log("Max size: " + max_size);
    console.log("Beta: " + beta);
    console.log(">>>>>>>> " + EP[beta][1] + " <<<<<<<<<<<<<");


    document.getElementsByClassName("square")[EP[beta][1]].classList.add("square_PC");

    document.getElementsByClassName("square")[EP[beta][1]].getElementsByTagName("span")[0].innerHTML = "O";

    document.getElementsByClassName("square")[EP[beta][1]].getElementsByTagName("span")[0].style.visibility = "visible";







}
