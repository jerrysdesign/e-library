$(document).ready ->
  # 設置 radio 
  $(".radioholder").each ->
    $(this).children().hide()
    description = $(this).children("label").html()
    $(this).append "<span class=\"desc\">" + description + "</span>"
    $(this).prepend "<span class=\"tick\"></span>"
    $(this).click ->
      $(this).children("input").prop "checked", true
      $(this).children("input").trigger "change"
      return
    return
  # 當 radio 元素改變時，更新 radio 的 class
  $("input[type=radio]").change ->
    $("input[type=radio]").each ->
      if $(this).prop("checked") is true
        $(this).parent().addClass "activeradioholder"
      else
        $(this).parent().removeClass "activeradioholder"
      return
    return
  # 觸發頁面載入 radio 更改事件
  $("input[type=radio]").change()
  # 設置 radio 
  $(".selectholder").each ->
    $(this).children().hide()
    description = $(this).children("label").text()
    $(this).append "<span class=\"desc\">" + description + "</span>"
    $(this).append "<span class=\"pulldown\"></span>"
    # 設置下拉元素
    $(this).append "<div class=\"selectdropdown\"></div>"
    $(this).children("select").children("option").each ->
      if $(this).attr("value") isnt "0"
        $drop = $(this).parent().siblings(".selectdropdown")
        name = $(this).attr("value")
        $drop.append "<span>" + name + "</span>"
      return
    # 按下時顯示下拉
    $(this).click ->
      if $(this).hasClass("activeselectholder")
        # 下拉收合
        $(this).children(".selectdropdown").slideUp 100
        $(this).removeClass "activeselectholder"
        # 抓 selected option text 到 span
        if $(this).children("select").val() isnt "0"
          $(this).children(".desc").fadeOut 50, ->
            $(this).text $(this).siblings("select").val()
            $(this).fadeIn 50
            return

      else
        # 如果有任何其他開啟的下拉，關閉
        $(".activeselectholder").each ->
          $(this).children(".selectdropdown").slideUp 100
          if $(this).children("select").val() isnt "0"
            $(this).children(".desc").fadeOut 100, ->
              $(this).text $(this).siblings("select").val()
              $(this).fadeIn 100
              return

          $(this).removeClass "activeselectholder"
          return
        # 下拉展開
        $(this).children(".selectdropdown").slideDown 100
        $(this).addClass "activeselectholder"
        # 當開啟的時候 抓 span 顯示到 select box title
        if $(this).children("select").val() isnt "0"
          $(this).children(".desc").fadeOut 100, ->
            $(this).text $(this).siblings("select").children("option[value=0]").text()
            $(this).fadeIn 50
            return
      return
    return
  # 當下拉選取點擊時
  $(".selectholder .selectdropdown span").click ->
    $(this).siblings().removeClass "active"
    $(this).addClass "active"
    value = $(this).text()
    $(this).parent().siblings("select").val value
    $(this).parent().siblings(".desc").fadeOut 100, ->
      $(this).text value
      $(this).fadeIn 100
      return
    return
  return