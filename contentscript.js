$(document).ready(function(){
  var carbTotal = parseInt($(".total:first td:nth-child(3)").text());
  var fatTotal = parseInt($(".total:first td:nth-child(4)").text());
  var proteinTotal = parseInt($(".total:first td:nth-child(5)").text());

  function getMacro(macro, i)
  {
    chrome.storage.local.get(macro, function(data){
      if(data[macro]){
        var data = parseInt(data[macro]);
        var calorie = (macro == "fat") ? 9 : 4;
        updateMacroDOM(data, i, calorie);
      }
    });
  }

  function updateMacroDOM(data, td, calorie)
  {
    $(".total.alt td:nth-child("+td+")").text(data);
    $(".total.remaining td:nth-child("+td+")").text(data - parseInt($(".total:first td:nth-child("+td+")").text()));
    if(parseInt($(".total.remaining td:nth-child("+td+")").text()) < 0)
    {
      $(".total.remaining td:nth-child("+td+")").css("color", "red");
    }

    var currentGoal = parseInt($(".total.alt td:nth-child(2)").text());
    var totalSoFar = parseInt($(".total:first td:nth-child(2)").text().replace(/,/g,''));
    $(".total.alt td:nth-child(2)").text(currentGoal + (data * calorie));
    $(".total.remaining td:nth-child(2)").text(parseInt($(".total.alt td:nth-child(2)").text()) - totalSoFar);
  }

  var macros = ["carb", "fat", "protein"];
  $(".total.alt td:nth-child(2)").text("0");
  $(".total.remaining td:nth-child(2)").text("0");
  for (i = 3; i <= 5; i++){
    getMacro(macros[i-3], i);
  }
});

