var num_buttons = 3;
var num_images = 3;
var display_index = 0;
var num_responses_index = 1;
var responses_index = 2;
var next_state_index = 3;
var previous_state_index = 4;
var image_index = 5;
var first_phase = "Main";
/*Format: [
    Question, //
    number of responses,
    [list of responses], (what you want on the buttons)
    [list of next phase ids], 
    previous state id, 
    [list of pictures]
    ]

For example, say you wanted to add a branch after Wait_able. First, you would go to the Wait_able entry and change the number of responses,
responses, and list of next phase ids. If you wanted pictures as well, be sure to add a list of those:
Wait_able: ["Sit tight! There is a very good chance you will be enrolled when Phase 2 starts.", 0, [], [], "Avail_no"] ->
Wait_able: ["Sit tight! There is a very good chance you will be enrolled when Phase 2 starts. Any more Questions?", 2, ["Yes", "No"], [Q_yes, Q_no], "Avail_no"]

This will create two buttons in the current branch that say "Yes" and "No", and the next two Phases are called Q_yes and Q_no
Then, we add the new Branches. Say we wanted "Yes" to lead to a a page that said "Email PsychSSO", with no further brancing. You would enter the following entry into the dict
Q_yes: ["Email PsychSSO", 0, [], [], "Wait_able"] where 0 and the two empty lists denote that this branch is a dead end, and wait_able is the previous state
If we wanted "No" to lead to "What do you have questions about?" with the options enrollment and advising, with two pictures corresponding to the buttons called "enrollment.png" and "advising.png"
Q_no: ["What do you have questions about?", 2, ["Enrollment", "Advising"], ["Enrollment_q", "Advising_q"], "Wait_able", ["enrollment.png", "advising.png"]]
In this case, you would also have to add the branches called Enrollment_q and Advising_q to the dictionary

To change the root node, we must first change the current "Main" phase to another name. The root of the tree will always be called "Main" with a previous state of "First"
We must then change the current Main phase's previous to main, as well as all other states whose previous states were main. 
Then we enter our new root into dict, which we call Main and with a previous state of "First"
Then, in the html page, change the values of the buttons to the phase id values of the children of the root. Change button visibilities accordingly to how many are initiall displayed. 

BOTTOM LINE: Make sure that next phase ids and previous ids are aligned in order correctly

To see Flowchart of Current Tree, see: https://www.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=flowchart#R1Zpbb5swFMc%2FTbTtoRXG3PKYZun2sFaV%2BtD1KXKCG2gJ
joxz26efDSZcbKpOCw6tqsocji%2F8fM7fNnQEp%2BvDD4o20R0JcTKyrfAwgt9Htg182x6JXys8FhZn7BaGFY1D6VQZHuM%2FWBotad3GIc4ajoyQhMWbpnFJ0hQvWcOGKCX7ptsLSZq9btAKK4bHJUpU61McsqiwBq5V2X%2FieBWVPQNL
3lmg5duKkm0q%2BxvZ8CX%2FKW6vUdmW9M8iFJJ9zQRnIzilhLCitD5McSLYltiKercdd0%2FjpjhlH6pQjoMdy2fHIUchLwllEVmRFCWzynqTPx8WLVj8KmLrhBcBL%2FJO6fG3tOcXz%2BLiGvpuaXjANF5jhqn0esWMHWUAoC0j3FR1%2
BouQjWy6GKYYW%2BeTSlNGtnQpvaCMHURXWHp5J8o8ejHhY6FH7kJxgli8a7aOZBitTn4VSl6QNDvI2v2QvXbcJlwLwMHA9U3BhT3BDVpsg2AwbF1DbGXXO5RsZaN3KE5V3knC1Vhw3Ucxw48blI99zxeEJl3ZHKYMH95HoD6crAAdKVNyOSnV
c19pMyhtUU2XA%2BsMoeb1FGqu2wi2Kx5t0L9MtLlqtAWmMtnvCa%2Fn%2BY1cHgxZYCqRXSWRHyKU4TlQiRvMZQCauQygwWT2FCST8HWbsbUY%2FCWpeG6LimOQit8RKJodzAVFH7gmVX%2Fcl%2Bq3Ralf%2FQk0%2BmNK2m2N0JxH2oeybm
ro1k5x%2FdIN1KTNjsto%2FszPzbaX8OHchPGOF1ei%2BDW%2Fyf3v0Cuh30oP3knN6aLpfgX81iZvbDDfYV%2BntdrR98LHNaDZi0BT0QrPemC7AKiO4D3%2Ffliza8vz%2Bp7o0vqe8JOZNfjkVnI7MLmWq1I52aE46ZLKR4wYv2HlTmiR4CES
vXKsJlJoUi7tT5TOJYPGKm3%2FZzrnVSeUomPNYUPiVETOqeUHYajNGWydfVxgtagXTVZzcBrbx6bF7WsVC0BrFbPHl1nFtLPpGBLnsnNFSbrEmft%2BDjVpC7Rj8lRu2wpWDc4nFLO5ANjFT52ASSgCW3w74n9E%2FSTO2CD5wxZ%2F16iaB59Iz
R1N%2Fpv6pmP39VbAAUN4Walla%2BqTTtn5B0Rgm%2F6bDExR%2BoUvwx5ai8xNF9mm5phtUFp6cr14Ty3qrkMUERA0RcQDGhHxNCLin0NE1HerM0oJne85yY6ZFIB5ldutaGl4PGFri%2B17JkVZfStb8ERiI6EBOo3w8k0MrgK7IIchcgWtl92%
2Bb5ArVPdwuahot3AaQRggUBC4DZ6OyY8HEOh5HrWH61rWx2JX%2FDLM1G99eugTKL%2Bs%2Ft2nOPNV%2F1MFZ38B
*/
var dict = {
    Main: ["Hi, which phase of enrollment are you in currently?",
            3, 
            ["Phase 1", "Phase 2", "Adjustment Period"], 
            ["Phase_1", "Phase_2", "Adjustment"], 
            "root", 
            []
        ],
    Phase_1: ["Are you a declared Psychology major on CalCentral?", 
            2, 
            ["Yes", "No"], 
            ["Psych_Yes", 'Psych_No'], 
            "Main", 
            []
        ], 
Psych_Yes: ["Check if seats are open in the class! Don't rely on the green dot, as this can often be misleading. Look at the class in your schedule planner, and click on the 'i' icon (see below).<br>If the Reserve Caps is full, then the class is full for phase 1.<br>Are Seats Available on CalCentral?",
             2, 
            ["Yes", "No"], 
            ["Avail_yes", 'Avail_no'], 
            "Phase_1", 
            ["reserve_caps2.png"]
        ],
Avail_yes: ["You should be clear to enroll! Make sure to select a section with available seats as seen below. If you try to enroll in a section that is full, you will be placed on the waitlist. Also make sure that you don't have a schedule conflict before selecting classes or the system will not let you enroll.", 
            0, 
            [], 
            [], 
            'Psych_Yes', 
            ["Available_Discussion_Seats.JPG"]
        ],
Avail_no: ["If you are serious about taking the course, we recommend that you add yourself to the waitlist. This way, you have a better chance of enrolling once Phase 2 starts. Were you able to add yourself to the waitlist?", 
            2, 
            ["Yes", "No"], 
            ["Wait_able", 'Wait_unable'], 
            "Psych_Yes", 
            []
        ],
Wait_able: ["Sit tight! There is a very good chance you will be enrolled when Phase 2 starts.",
            0, 
            [], 
            [], 
            "Avail_no", 
            []
        ], 
Wait_unable: ["Which of these errors are you receiving?", 
            3, 
            ["No Waitlist Available", "Schedule Conflict", "Unit Limit Exceeded"], 
            ["Error_wait", 'Error_conflict', "Error_units"], 
            "Psych_Yes", 
            ["class_full_error_small.png", "schedule_conflict.png", "unit_limit.png"]
        ], 
Error_wait: ["Seats reserved for Psych majors and the waitlist are currently full. Please try again in Phase 2.", 
            0, 
            [], 
            [], 
            "Wait_unable", 
            ["class_full_error.png"]
        ],
Error_conflict: ["This error means you have a schedule conflict with another enrolled course. Please resolve this schedule conflict and try again.",
            0,
            [],
            [], 
            "Wait_unable", 
            ["schedule_conflict.png"]
        ],
Error_units: ["This error means that you are trying to enroll in more than 13.5 units. These units account for both enrolled and waitlisted classes. Please either allocate unit space or try again in phase 2.",
            0,
            [],
            [],
            "Wait_unable",
            ["unit_limit.png"]
            ],
Psych_No: ["Unfortunately, enrollment in upper division Psychology courses is reserved for declared Psych Majors during Phase 1. You can maximize your chances of being enrolled in Phase 2 by adding to the waitlist.<br> Is the waitlist for the class full? <br>(To check, go to the online of classes and look at 'Waitlist Capacity')", 
            2, 
            ["Yes", "No"], 
            ['Wait_yes', 'Wait_no'], 
            "Phase_1", 
            ["waitlist_capacity.png"]
        ],
Wait_yes: ["Unfortunately, the waitlist for Phase 1 is currently full. <br>Available seats are reserved for Psychology Majors.<br>Please try to enroll in Phase 2.", 
            0, 
            [], 
            [], 
            "Psych_No", 
            ["class_full_error.png"]
        ],
Wait_no: ["Check 'waitlist if full' on CalCentral and place yourself on the waitlist. This will give you the best chance for getting enrolled in phase 2.", 
            0, 
            [], 
            [], 
            "Psych_No", 
            ["waitlist_box.png"]
        ],
Phase_2: ["Are you an incoming Spring 2018 Transfer Student?", 
            2, 
            ["Yes", "No"], 
            ["Transfer_yes", "Transfer_no"], 
            "Main", 
            []
        ],
Transfer_yes: ["You should prioritize enrolling in Psych 101.<br>A handful of seats are reserved for you for your first semester.<br> Don't overload yourself!",
            0,
            [],
            [],
            "Phase_2",
            []
            ],
Transfer_no: ["Are you a declared Psychology Major?",
            2,
            ["Yes", "No"],
            ["Psych_2", "Psych_2"], //Just to appease Psych majors
            "Phase_2",
            []
            ],
Psych_2: ["Does the course you are trying to enroll in appear to be open <br>(Does it have a green dot on CalCentral)? ",
            2,
            ["Yes", "No"],
            ["Dot_yes", "Dot_no"],
            "Transfer_no",
            []
            ],
Dot_yes: ["In most cases, you should be clear to enroll.<br>Are you receiving one of the following errors?",
            3,
            ["Seats Reserved", "Schedule Conflict", "Not Listed Here"],
            ["Error_reserved", "Error_schedule", "Error_other2"],
            "Psych_2",
            ["reserved_seat_error_small.png", "schedule_conflict.png"]
            ],
Dot_no: ["Unfortunately, the class is full but you can add yourself to the waitlist by checking the 'Waitlist if full' box in CalCentral. The Waitlist is processed automatically every day.<br>Keep in mind the following may prevent you from getting off the waitlist: <br>1. Your section is full<br>2. You have a time conflict<br>3. You are over the unit limit",
            0,
            [],
            [],
            "Psych_2",
            ["waitlist_box.png"]
            ],
Error_reserved:["During phase 2, there are a certain number of seats reserved for transfer students. This error means that seats for Psych majors and other students have been taken. To add yourself to the waitlist, check the 'Waitlist if full' option on Calcentral", 
            0, 
            [], 
            [], 
            "Dot_yes", 
            ["waitlist_box.png"]
        ],
Error_schedule:["Unfortunately, you have a schedule conflict and the system does not let you enroll directly in the class. You may add yourself to the waitlist, but you would be forever stuck there unless you resolve the schedule conflict", 
            0, 
            [], 
            [], 
            "Dot_yes", 
            ["schedule_conflict.png"]
        ],
Error_other2:["Please email psychscheduling@berkeley.edu with a screenshot of your error message.",
            0,
            [],
            [],
            "Dot_yes",
            []
        ],
Adjustment:["The Adjustment Period hasn't started yet!", 
            0, 
            [], 
            [], 
            "Main",
            []
        ]
};

// This message does not mean that you did not satisfy the prerequisite listed on the catalog. Please try again by checking the 'waitlist if full' option on CalCentral as seen below. This will give you the best chance for getting enrolled in phase 2. If you have other concerns, feel free to email psychscheduling@berkeley.edu
function changeText(value) {
    document.getElementById('text').innerHTML = dict[value][display_index];
    document.getElementById('back').style.visibility = "visible";
    document.getElementById('back').value = dict[value][previous_state_index];
    document.getElementById('reset').style.visibility = "visible"
    document.getElementById('bottom').style.visibility = "hidden";
    var counter = 0;
    while (counter < num_buttons){
       if (counter >= dict[value][num_responses_index]) {
            document.getElementById(String(counter)).style.visibility = "hidden";
            } else {
            document.getElementById(String(counter)).innerHTML = dict[value][responses_index][counter];
            document.getElementById(String(counter)).value = dict[value][next_state_index][counter];
            document.getElementById(String(counter)).style.visibility = "visible";
            }
            counter++;
        }
    counter = 0;
    if (dict[value][image_index].length > 0){ 
        if (dict[value][image_index].length == 1){
            document.getElementById('sp').style.visibility = "visible";
            document.getElementById("sp").src = dict[value][image_index][counter];
        } else {
            document.getElementById('sp').style.visibility = "hidden";
            document.getElementById('sp').src = "null";
            while (counter < dict[value][image_index].length){
                document.getElementById(String(counter)+'i').src = dict[value][image_index][counter];
                document.getElementById(String(counter)+'i').style.visibility = "visible";
                counter++;
            }
        }
        while (counter < num_images){
            document.getElementById(String(counter)+'i').style.visibility = "hidden";
            document.getElementById(String(counter)+'i').src = "null";
            counter++;
        }
    } else {
        document.getElementById('sp').style.visibility = "hidden";
        document.getElementById('sp').src = "null";
        while (counter < num_images){
            document.getElementById(String(counter)+'i').src = "null";
            document.getElementById(String(counter)+'i').style.visibility = "hidden";
            counter++;
        }
    }
}


function goBack(value){
    document.getElementById('text').innerHTML = dict[value][display_index];
    var counter = 0;
    while (counter < num_buttons){
        if (counter >= dict[value][num_responses_index]){
            document.getElementById(String(counter)).style.visibility = "hidden";
        } else {
            document.getElementById(String(counter)).innerHTML = dict[value][responses_index][counter];
            document.getElementById(String(counter)).value = dict[value][next_state_index][counter];
            document.getElementById(String(counter)).style.visibility = "visible";
        }
       counter++;
    }
    counter = 0;
    if (dict[value][image_index].length > 0){ 
        if (dict[value][image_index].length == 1){
            document.getElementById('sp').style.visibility = "visible";
            document.getElementById("sp").src = dict[value][image_index][counter];
        } else {
            document.getElementById('sp').style.visibility = "hidden";
            document.getElementById('sp').src = "null";
            while (counter < dict[value][image_index].length){
                document.getElementById(String(counter)+'i').src = dict[value][image_index][counter];
                document.getElementById(String(counter)+'i').style.visibility = "visible";
                counter++;
            }
        }
        while (counter < num_images){
            document.getElementById(String(counter)+'i').style.visibility = "hidden";
            document.getElementById(String(counter)+'i').src = "null";
            counter++;
        }
    } else {
        document.getElementById('sp').style.visibility = "hidden";
        document.getElementById('sp').src = "null";
        while (counter < num_images){
            document.getElementById(String(counter)+'i').src = "null";
            document.getElementById(String(counter)+'i').style.visibility = "hidden";
            counter++;
        }
    }
    document.getElementById('back').value = dict[value][previous_state_index];
    if (document.getElementById('back').value == "root") {
        document.getElementById('back').style.visibility = "hidden";
        document.getElementById('reset').style.visibility = "hidden";
        document.getElementById('bottom').style.visibility = "visible";
    }
}
function reset(){
    goBack("Main");
    if (document.getElementById('back').value == "root") {
        document.getElementById('reset').style.visibility = "hidden";
        document.getElementById('bottom').style.visibility = "visible";
    }
}

        