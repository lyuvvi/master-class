// Слайдер
const slider = document.querySelector(".items");
const slides = document.querySelectorAll(".item");
const button = document.querySelectorAll(".button");

let current = 0;
let prev = 4;
let next = 1;

for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", () => i == 0 ? gotoPrev() : gotoNext());
}

const gotoPrev = () => current > 0 ? gotoNum(current - 1) : gotoNum(slides.length - 1);

const gotoNext = () => current < 4 ? gotoNum(current + 1) : gotoNum(0);

const gotoNum = number => {
    current = number;
    prev = current - 1;
    next = current + 1;

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        slides[i].classList.remove("prev");
        slides[i].classList.remove("next");
    }

    if (next == 5) {
        next = 0;
    }

    if (prev == -1) {
        prev = 4;
    }

    slides[current].classList.add("active");
    slides[prev].classList.add("prev");
    slides[next].classList.add("next");
}

// Фильтр на слайдере
$(document).ready(function () {
    $(".button__filter").click(function () {
        var value = $(this).attr("data-filter");
        var elem = $(".elem");
        if (value == "all") {
            $(elem).show("500");
        }
        else {
            $(elem).not("." + value).hide("500");
            $(elem).filter("." + value).show("500");
        }
    });
});

// Фильтрация
$(document).ready(function () {
    $(".filter-list__button").click(function () {
        var value = $(this).attr("data-filter");
        var elem = $(".elem");
        if (value == "all") {
            $(elem).show("500");
        }
        else {
            $(elem).not("." + value).hide("500");
            $(elem).filter("." + value).show("500");
        }
    });
});

// Смена вида карусели на грид
var HIDDEN_CLASS_NAME = 'hidden'
var TARGET_CLASS_NAME = 'target'
var SOURCE_CLASS_NAME = 'source'

var targetIdToShow = 1

function main() {
    var targets = getElements(TARGET_CLASS_NAME)
    var sources = getElements(SOURCE_CLASS_NAME)
    sources.forEach(function (sourceNode) {
        var sourceNodeId = extractId(sourceNode, SOURCE_CLASS_NAME)
        sourceNode.addEventListener('click', function () {
            showTarget(targets, sourceNodeId)
        })
    })
    showTarget(targets, targetIdToShow)
}

function getElements(type) {
    return [].slice.call(document.querySelectorAll('.' + type)).sort(function (targetNode1, targetNode2) {
        var target1Num = extractId(targetNode1, TARGET_CLASS_NAME)
        var target2Num = extractId(targetNode2, TARGET_CLASS_NAME)
        return target1Num > target2Num
    })
}

function extractId(targetNode, baseClass) {
    var currentClassIndex = targetNode.classList.length
    while (currentClassIndex--) {
        var currentClass = targetNode.classList.item(currentClassIndex)
        var maybeIdNum = parseInt(currentClass.split('-')[1])
        if (isNaN(maybeIdNum)) {
            continue
        }
        var classStrinToValidate = baseClass + '-' + maybeIdNum
        if (classStrinToValidate === currentClass) {
            return maybeIdNum
        }
    }
}

function showTarget(targets, targetId) {
    targets.forEach(function (targetNode, targetIndex) {
        var currentTargetNodeId = extractId(targetNode, TARGET_CLASS_NAME)
        if (currentTargetNodeId === targetId) {
            targetNode.classList.remove(HIDDEN_CLASS_NAME)
        } else {
            targetNode.classList.add(HIDDEN_CLASS_NAME)
        }
    })
}

main()
