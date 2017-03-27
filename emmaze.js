
$(function() {
    var nwDoorConfig = [false, true, true, true, false, true, false, false, true, false, true, false];
    var neDoorConfig = [true, false, true, true, true, false, true, false, true, false, true, true];    
    var swDoorConfig = [false, false, true, false, true, false, false, false, true, false, true, false];
    var seDoorConfig = [true, false, false, true, false, true, true, true, false, true, false, true];
    
    var northwestRoom;
    var northeastRoom;
    var southwestRoom;
    var southeastRoom;
        
    function generateSegment(doorConfig) {
        var segment = document.createElement("div");
        segment.classList.add("segment");
        
        var door1 = document.createElement("div");
        door1.classList.add("door");
        if (!doorConfig[0]) {
            door1.classList.add("closed");
        }
        door1.style = "top: 0px; left: 0px;";
        segment.appendChild(door1);
                
        var door2 = document.createElement("div");
        door2.classList.add("door");
        if (!doorConfig[1]) {
            door2.classList.add("closed");
        }
        door2.style = "top: 0px; left: 40%;";
        segment.appendChild(door2);
                
        var door3 = document.createElement("div");
        door3.classList.add("door");
        if (!doorConfig[2]) {
            door3.classList.add("closed");
        }
        door3.style = "top: 0px; left: 80%;";
        segment.appendChild(door3);
        
        return segment;
    }
    
    function createRoom(location, doors) {
        
        var room = document.createElement("div");
        room.classList.add("room");
        
        var rotateState = document.createElement("div");
        rotateState.classList.add("rotated");
        room.appendChild(rotateState);
        var rotated = $(room).find(".rotated");
        rotated.val(0);
        
        var north = generateSegment([doors[0], doors[1], doors[2]]);
        north.style = "top: -5px; left: -5px;";
        north.classList.add("rotate-0");
        room.appendChild(north);
        
        var east = generateSegment([doors[3], doors[4], doors[5]]);
        east.style = "top: 142px; left: 143px";
        east.classList.add("rotate-90");
        room.appendChild(east);
        
        var south = generateSegment([doors[6], doors[7], doors[8]]);
        south.style = "top: 290px; left: -5px;"
        south.classList.add("rotate-180");
        room.appendChild(south);
        
        var west = generateSegment([doors[9], doors[10], doors[11]]);
        west.style = "top: 142px; left: -152px;"
        west.classList.add("rotate-270");
        room.appendChild(west);
                
        $("#maze").append(room);
        return room;
    }

    function createRooms() {
        northwestRoom = createRoom("northwest", nwDoorConfig).style = "top: 0; left: 0;";
        northeastRoom = createRoom("northeast", neDoorConfig).style = "top: 0; left: 300px;";
        southwestRoom = createRoom("southwest", swDoorConfig).style = "top: 300px; left: 0;";
        southeastRoom = createRoom("southeast", seDoorConfig).style = "top: 300px; left: 300px;";
    }
    
    function rotateRoom(room) {
        var rotated = $(room).find(".rotated");
        var curval = parseInt(rotated.val());
        var newval = (curval + 90)%360;
        rotated.val(newval);
        $(room).removeClass("rotate-" + curval);
        $(room).addClass("rotate-" + newval);
    }

    createRooms();


    $(".room").click(function(event) {
        rotateRoom(this);
        $(this).addClass("rotate-90");
    });
    
});