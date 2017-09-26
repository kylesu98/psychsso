var num_buttons = 3;
            var num_images = 2;
            var display_index = 0;
            var num_responses_index = 1;
            var responses_index = 2;
            var next_state_index = 3;
            var previous_state_index = 4;
            var image_index = 5;
            var first_phase = "Main"
            'Format: [Question, number of responses, responses, list of next phase ids, previous state id, list of pictures]'
            var responses = ["Do you have question about enrolling in classes?", "Make an appointment with our Graduate advisors",
            "Is the class you're signing up for full?", "Do you have an advisor hold?"];
            var dict = {Main: ["Hi, which phase of enrollment are you in currently?", 3, ["Phase 1", "Phase 2", "Adjustment Period"], ["Phase_1", "Phase_2", "Adjustment"], "Main"],
            Phase_1: ["Are you a declared Psychology major on calcentral?", 2, ["Yes", "No"], ["Psych_Yes", 'Psych_No'], "Main"], 
            Psych_Yes: ["Are Seats Available on Calcentral? (Don't rely on the green dot)", 2, ["Yes", "No"], ["Avail_yes", 'Avail_no'], "Phase_1"],
            Avail_yes: ["You should be clear to enroll! Make sure to select a section with available seats. If you try to enroll in a section that is full, you will be placed on the waitlist.", 0, [], [], 'Psych_Yes', ["Available_Discussion_Seats.jpg"]],
            Avail_no: ["If you are serious about taking the course, we recommend that you add yourself to the waitlist. This way, you have a better chance of enrolling once Phase 2 starts. Were you able to add yourself to the waitlist?", 2, ["Yes", "No"], ["Wait_able", 'Wait_unable'], "Psych_Yes"],
            Wait_able: ["Sit tight! There is a very good chance you will be enrolled when Phase 2 starts.", 0, [], [], "Avail_no"], 
            Wait_unable: ["Which of these errors are you receiving?", 2, ["No Waitlist Available", "Available seats reserved"], ["Error_wait", 'Error_avail'], "Psych_Yes", ["class_full_error.png", "reserved_seat_error.png"]], 
            Error_wait: ["Seats reserved for Psych majors and the waitlist are currently full. Please try to enroll in Phase 2, and if you have any more questions, feel free to email psychscheduling@berkeley.edu", 0, [], [], "Wait_unable", ["class_full_error.png"]],
            Error_avail: ["This message does not mean that you did not satisfy the prerequisite listed on the catalog. Please try again by checking the 'waitlist if full' option on calcentral. Check 'waitlist if full' as shown below to place yourself on the waitlist. This will give you the best chance for getting enrolled in phase 2. If you have other concerns, feel free to email psychscheduling@berkeley.edu", 0, [], [], "Wait_unable", ["waitlist_box.png"]],
            Psych_No: ["Unfortunately, enrollment in upper division Psychology courses are reserved for declared Psychology Majors during Phase 1. Is the waitlist for the class full?", 2, ["Yes", "No"], ['Wait_yes', 'Wait_no'], "Phase_1"],
            Wait_yes: ["Unfortunately, the waitlist is currently full. Available seats are reserved for Psychology Majors. Please try to enroll in Phase 2, and if you have any more questions, feel free to email psychscheduling@berkeley.edu", 0, [], [], "Psych_No", ["class_full_error.png"]],
            Wait_no: ["Check 'waitlist if full' on calcentral and place yourself on the waitlist. This will give you the best chance for getting enrolled in phase 2. If you have other concerns, feel free to email psychscheduling@berkeley.edu", 0, [], [], "Psych_No", ["waitlist_box.png"]],
            Phase_2:["Phase 2 hasn't started yet!", 0, [], [], "Main"],
            Adjustment:["The Adjustment Period hasn't started yet!", 0, [], [], "Main"]
            };
            function changeText(value) {
                document.getElementById('text').innerHTML = dict[value][display_index];
                document.getElementById('back').style.visibility = "visible";
                document.getElementById('back').value = dict[value][previous_state_index];
                var counter = 0;
                while (counter < num_buttons){
                   if (counter >= dict[value][num_responses_index]) {
                        document.getElementById(String(counter)).style.visibility = "hidden";
                        } else {
                        document.getElementById(String(counter)).innerHTML = dict[value][responses_index][counter];
                        document.getElementById(String(counter)).value = dict[value][next_state_index][counter];
                        }
                        counter++;
                    }
                counter = 0;
                if (dict[value].length > image_index){ 
                    while (counter < dict[value][image_index].length){
                        document.getElementById(String(counter)+'i').src = dict[value][image_index][counter];
                        document.getElementById(String(counter)+'i').style.visibility = "visible";
                        counter++;
                    }
                    while (counter < num_images){
                        document.getElementById(String(counter)+'i').style.visibility = "hidden";
                        counter++;
                    }
                } else {
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
                if (dict[value].length > image_index){ 
                    while (counter < dict[value][image_index].length){
                        document.getElementById(String(counter)+'i').src = dict[value][image_index][counter];
                        document.getElementById(String(counter)+'i').style.visibility = "visible";
                        counter++;
                    }
                    while (counter < num_images){
                        document.getElementById(String(counter)+'i').style.visibility = "hidden";
                        counter++;
                    }
                } else {
                    while (counter < num_images){
                        document.getElementById(String(counter)+'i').src = "null";
                        document.getElementById(String(counter)+'i').style.visibility = "hidden";
                        counter++;
                    }
                }
                document.getElementById('back').value = dict[value][previous_state_index];
                if (document.getElementById('0').value == "Phase_1") {
                    document.getElementById('back').style.visibility = "hidden";
                }
            }
        