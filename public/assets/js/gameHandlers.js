// Create event handlers

// --------------- Party Selection Modal Handlers ---------------
function partySelectionItemToggle(event) {
    event.preventDefault();
    let target = $(event.target);
    
    if (target.hasClass("selection-item-active")) {

        target.removeClass("selection-item-active")

    }else{

        target.addClass("selection-item-active")

    }

}

function partySelectionFinishHandler(event) {
    event.preventDefault();
    let userArray = Object.values($(".selection-item")).splice(0,Object.values($(".selection-item")).length - 4).map(item => $(item).data("id"));

    console.log(userArray);

  $.post("/api/game/aaaa/partySelection", {
    userArray: userArray 
  })
    .then(() => {
      // If there's an error, log the error
    })
    .fail(err => {
      console.log(err);
    });
}

function partySelectionResetHandler(event) {
  event.preventDefault();
  $(`.selection-item`).removeClass(".selection-item-active");
}

// --------------- Party Valid Vote Modal Handlers ---------------
function partyValidVoteVetoHandler(lobbyCode, event) {
  event.preventDefault();
  $.post(`/api/game/${lobbyCode}/validVote`, { vote: -1 }).then(() => $modalContainer.empty()).catch(displayError);
}

function partyValidVoteApproveHandler(event) {
  event.preventDefault();
  $.post(`/api/game/${lobbyCode}/validVote`, { vote: 1 }).then(() => $modalContainer.empty()).catch(displayError)
}

// --------------- Party Pass Vote Modal Handlers ---------------
function partyPassVoteFailHandler(event) {
  event.preventDefault();
  $.post(`/api/game/${lobbyCode}/validVote`, { vote: -1 }).then(() => $modalContainer.empty()).catch(displayError)
}

function partyPassVotePassHandler(event) {
  event.preventDefault();
  $.post(`/api/game/${lobbyCode}/validVote`, { vote: 1 }).then(() => $modalContainer.empty()).catch(displayError)
}

// --------------- Error Message Handlers -----------------------
function displayError(xhr, status, err){
  console.log("Error from gameHandler.js");
  console.log(xhr);
  console.log(status);
  console.log(err);
}