$(document).ready(function(){
  loadMacros();

  $('#saveButton').click(saveChanges);
});

function saveChanges() {
  // Get a value saved in a form.
  var carb = $('#carb').val();
  var fat = $('#fat').val();
  var protein = $('#protein').val();
  // Check that there's some code there.
  if (!carb) {
    alert('Error: No value specified');
    return;
  }
  else if (!fat) {
    alert('Error: No value specified');
    return;
  }
  else if (!protein) {
    alert('Error: No value specified');
    return;
  }
  chrome.storage.local.set({'carb': carb});
  chrome.storage.local.set({'fat': fat});
  chrome.storage.local.set({'protein': protein});

  // storage.set(obj);
  $("#saveButton").removeClass("btn-primary");
  $("#saveButton").addClass("btn-success");
  $("#saveButton").text("Saved!");

}

function loadMacros()
{
  chrome.storage.local.get("carb", function(data) {
    if(data["carb"]){
      $('#carb').val(data["carb"]);
    }
  });

  chrome.storage.local.get("fat", function(data) {
    if(data["fat"]){
      $('#fat').val(data["fat"]);
    }
  });

  chrome.storage.local.get("protein", function(data) {
    if(data["protein"]){
      $('#protein').val(data["protein"]);
    }
  });
}