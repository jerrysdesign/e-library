(function() {
  $(document).ready(function() {
    $(".radioholder").each(function() {
      var description;

      $(this).children().hide();
      description = $(this).children("label").html();
      $(this).append("<span class=\"desc\">" + description + "</span>");
      $(this).prepend("<span class=\"tick\"></span>");
      $(this).click(function() {
        $(this).children("input").prop("checked", true);
        $(this).children("input").trigger("change");
      });
    });
    $("input[type=radio]").change(function() {
      $("input[type=radio]").each(function() {
        if ($(this).prop("checked") === true) {
          $(this).parent().addClass("activeradioholder");
        } else {
          $(this).parent().removeClass("activeradioholder");
        }
      });
    });
    $("input[type=radio]").change();
    $(".selectholder").each(function() {
      var description;

      $(this).children().hide();
      description = $(this).children("label").text();
      $(this).append("<span class=\"desc\">" + description + "</span>");
      $(this).append("<span class=\"pulldown\"></span>");
      $(this).append("<div class=\"selectdropdown\"></div>");
      $(this).children("select").children("option").each(function() {
        var $drop, name;

        if ($(this).attr("value") !== "0") {
          $drop = $(this).parent().siblings(".selectdropdown");
          name = $(this).attr("value");
          $drop.append("<span>" + name + "</span>");
        }
      });
      $(this).click(function() {
        if ($(this).hasClass("activeselectholder")) {
          $(this).children(".selectdropdown").slideUp(100);
          $(this).removeClass("activeselectholder");
          if ($(this).children("select").val() !== "0") {
            $(this).children(".desc").fadeOut(50, function() {
              $(this).text($(this).siblings("select").val());
              $(this).fadeIn(50);
            });
          }
        } else {
          $(".activeselectholder").each(function() {
            $(this).children(".selectdropdown").slideUp(100);
            if ($(this).children("select").val() !== "0") {
              $(this).children(".desc").fadeOut(100, function() {
                $(this).text($(this).siblings("select").val());
                $(this).fadeIn(100);
              });
            }
            $(this).removeClass("activeselectholder");
          });
          $(this).children(".selectdropdown").slideDown(100);
          $(this).addClass("activeselectholder");
          if ($(this).children("select").val() !== "0") {
            $(this).children(".desc").fadeOut(100, function() {
              $(this).text($(this).siblings("select").children("option[value=0]").text());
              $(this).fadeIn(50);
            });
          }
        }
      });
    });
    $(".selectholder .selectdropdown span").click(function() {
      var value;

      $(this).siblings().removeClass("active");
      $(this).addClass("active");
      value = $(this).text();
      $(this).parent().siblings("select").val(value);
      $(this).parent().siblings(".desc").fadeOut(100, function() {
        $(this).text(value);
        $(this).fadeIn(100);
      });
    });
  });

}).call(this);
