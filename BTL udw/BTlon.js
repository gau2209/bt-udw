$(document).ready(function(){
    $(".nam-btn").mouseover(function(){
        $(this).toggleClass("nam-show").next().slideToggle();
    })
    .mouseout(function(){
        $(".cartegory-left ul.nam-show").hide()
    })
    $(".nu-btn").mouseover(function(){
        $(this).toggleClass("nu-show").next().slideToggle();
    })
    .mouseout(function(){
        $(".cartegory-left ul.nu-show").hide()
    })
    $(".phukien-btn").mouseover(function(){
        $(this).toggleClass("phukien-show").next().slideToggle();
    })
    .mouseout(function(){
        $(".cartegory-left ul.phukien-show").hide()
    })
})