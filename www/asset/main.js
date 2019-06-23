const socket = io({ reconnection: true })
var isClicked = false;



function personClicked(e) {
    e.stopImmediatePropagation();
    window.scroll(0, 0)

    const username = this.innerText,
        chatId = `${username}Chat`;


    let chatEl = document.querySelector(`.tab-content #${chatId}`);
    let tabbingObj = document.querySelector('#tabbing');
    let $tabLiObj = tabbingObj.querySelectorAll("li");

    let tabContent = document.querySelector('.tab-content');
    let chatDivInTabContent = tabContent.querySelectorAll('.chat');

    if (!chatEl) {
        chatEl = chat.cloneNode(true);
        chatEl.id = chatId;
        if (tabbingObj.classList.contains('hide')) {
            tabbingObj.classList.remove('hide');
        }

        chatEl.setAttribute('data-username', username);

        let newLI = tabbingObj.querySelector('.nav-tabs li').cloneNode(true);
        newLI.classList.remove('hide');
        newLI.classList.add('active');
        newLI.setAttribute('id', chatId);
        newLI.querySelector('a').setAttribute('href', '#' + chatId);
        newLI.querySelector('a span').innerHTML = `${username}`;


        if (chatDivInTabContent.length == 0) { // first time creating div
            tabbingObj.querySelector("ul").appendChild(newLI);
            tabContent.appendChild(chatEl);

        } else {
            // removing all active class from tab content
            for (var i = 0; i < chatDivInTabContent.length; i++) {
                if (chatDivInTabContent[i].classList.contains('active')) {
                    chatDivInTabContent[i].classList.remove('active');
                }
                chatDivInTabContent[i].classList.add('in-active');
            }

            // removing all active class from tab liss
            for (var i = 0; i < $tabLiObj.length; i++) {
                if ($tabLiObj[i].classList.contains('active')) {
                    $tabLiObj[i].classList.remove('active');
                }
                $tabLiObj[i].classList.add('in-active');
            }

            tabbingObj.querySelector("ul").appendChild(newLI);
            tabContent.appendChild(chatEl);
        }

    }

    // showing chat box
    chatEl.classList.remove('hide');
    chatEl.classList.remove('in-active');
    chatEl.querySelector('input').focus();

    // binding events for all close button
    tabbingObj.querySelector('.nav-tabs').addEventListener('click', function (e) {
        // e.stopPropagation();
        e.stopImmediatePropagation();
        handleEvents(e);
    })

}

function receiveMessage(data) {
    const chatIdSelector = `#${data.username}Chat`

    !document.querySelector(chatIdSelector) && [...peopleList.querySelectorAll('li')].some(personEl => {
        if (personEl.innerText === data.username) {
            personEl.click()
            return true
        }
    })

    const chatEl = document.querySelector('.tab-content').querySelector(chatIdSelector);
    if (chatEl) {
        const li = document.createElement('li');
        li.classList.add('reciver');
        li.innerHTML = data.username + ': ' + data.message
        chatEl.querySelector('ul').append(li)
    }
}

function sendMessage(form) {
    const li = document.createElement('li');
    li.classList.add('sender');
    li.innerHTML = username.value + ': ' + form.message.value
    form.parentElement.querySelector('ul').append(li)

    socket.emit('chat', {
        username: form.parentElement.getAttribute('data-username'),
        message: form.message.value
    })

    form.message.value = ''
}

document.body.addEventListener('submit', event => {
    event.preventDefault() // No page refresh on form submits.
    event.target.classList.contains('chat') && sendMessage(event.target)
})

// User entered a username.
nameForm.addEventListener('submit', fn => {
    document.querySelector('.user-menu a span').innerHTML = username.value

    socket.emit('join', username.value)
    nameForm.classList.add('hidden')
    peopleList.classList.remove('hidden')

    document.querySelector('body').classList.remove('login-bg')
    document.querySelector('#mainContainer').classList.remove('hide')
})

// Populate a list of connected clients.
socket
    .on('chat', receiveMessage)
    .on('people', people => {
        peopleList.innerHTML = '';
        people
            .filter(name => name != username.value)
            .forEach(name => {
                const li = document.createElement('li');
                li.addEventListener('click', personClicked);
                li.innerHTML = name;
                peopleList.append(li);

            })
    })



// Let user enter a username.
username.focus();

//making HTTP call
var responseData = [];
var countrySelectBox = document.querySelector('#country');
var selectBoxResult = document.querySelector('.selectBoxResult');
var callingCode = document.querySelector('#callingCode span');
var currency = document.querySelector('#currency span');
var timeZone = document.querySelector('#timeZone span');
var countryFlagImg = document.querySelector('#countryFlag img');

fetch('https://restcountries.eu/rest/v2/all')
    .then(response => { return response.json() })
    .then(data => {
        responseData = data;

        var html;
        // console.log(countrySelectBox.option.value)
        html += '<option value="0">Please Select</option>';
        for (var i in data) {
            html += "<option value='" + data[i].alpha2Code + "'>" + data[i].name + "</option>";
        }

        countrySelectBox.innerHTML = html;


    }).catch(function (err) {
        // Error :(
    });

countrySelectBox.onchange = function (e) {
    var selectedVal = e.target.value;
    if (selectedVal !== '0') {
        var obj = responseData.find(o => o.alpha2Code === selectedVal);

        for (var i in obj.callingCodes) {
            callingCode.innerHTML = obj.callingCodes[i];
        }

        for (var i in obj.currencies) {
            currency.innerHTML = obj.currencies[i].code;
        }

        for (var i in obj.timezones) {
            timeZone.innerHTML = obj.timezones[i];
        }

        countryFlagImg.src = obj.flag;
        selectBoxResult.classList.remove('hide');
    } else {
        selectBoxResult.classList.add('hide');
    }
}

let dropdownToggleBtn = document.querySelector('.dropdown-toggle');

dropdownToggleBtn.addEventListener('click', function () {
    if (!this.nextElementSibling.classList.contains('show')) {
        this.nextElementSibling.classList.add('show');
    } else {
        this.nextElementSibling.classList.remove('show');
    }
})

let tabbing = document.querySelector('#tabbing');
let tabContent = document.querySelector('.tab-content');

function onTabClicked(target) {
    if (target) {
        // removing all class from tabs
        var allTabsLi = tabbing.querySelectorAll('.nav-tabs li');
        if (allTabsLi.length > 0) {
            for (var i = 0; i < allTabsLi.length; i++) {
                if (allTabsLi[i].classList.contains('active')) {
                    allTabsLi[i].classList.remove('active');
                    allTabsLi[i].classList.add('in-active');
                }
            }
        }

        // removing all active classes from tab content
        var tabContentActiveClass = tabbing.querySelectorAll('.tab-content > div');
        if (tabContentActiveClass.length > 0) {
            for (var i = 0; i < tabContentActiveClass.length; i++) {
                if (tabContentActiveClass[i].classList.contains('active')) {
                    tabContentActiveClass[i].classList.remove('active');
                    // tabContentActiveClass[i].classList.add('in-active');
                }
            }

            // by default selecting first element
            var clickedItem = target.closest('li');
            var selectedTabContent = target.closest('li').getAttribute('id');

            clickedItem.classList.remove('in-active');
            clickedItem.classList.add('active');

            tabbing.querySelector('.tab-content').querySelector('#' + selectedTabContent).classList.remove('in-active');
            tabbing.querySelector('.tab-content').querySelector('#' + selectedTabContent).classList.add('active');
        }
    }

}

function handleEvents(e) {
    e.preventDefault();

    let target = e.target;
    console.log(target);
    if (target.classList.contains('nav-tabs')) {
        return
    }

    if (target || target.closest('li').classList.contains('in-active')) {
        
        if (
            target.getAttribute('data-toggle') ||
            target.parentElement.getAttribute('data-toggle') ||
            target.closest('li').classList.contains('in-active')) {
            onTabClicked(target);
        }
    }
}