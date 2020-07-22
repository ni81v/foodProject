'use strict';
window.addEventListener('DOMContentLoaded', () => {
    //tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(tab => {
            tab.classList.add('hide');
            tab.classList.remove('show', 'fade');
        });
        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) { //we assign 0 element by default
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    hideTabContent();
    showTabContent();

    tabParent.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('tabheader__item')) {
           tabs.forEach((item, i) => {
            if (e.target === item) {
                hideTabContent();
                showTabContent(i);
            }
           });
        }
    });

    //timer
    const deadline = '2020-07-29';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
        
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num <= 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
            
            updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadline);

    //modal
    const modalBtns = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalClose = document.querySelector('[data-close]');

    modalBtns.forEach(item => {
        item.addEventListener('click', () => {
            // modal.style.display = 'block';

            // modal.classList.add('show');
            // modal.classList.remove('hide');
            // document.body.style.overflow = 'hidden';//to block scrolling page
            showModal();
        });
    });
    modalClose.addEventListener('click', () => {
        // modal.style.display = 'none';

        // modal.classList.add('hide');
        // modal.classList.remove('show');
        // document.body.style.overflow = '';
        closeModal();
    });

    //to use toggle, add class 'show' to your modal and the following:
    //modal.classList.toggle('show');
    //to both open and close btns
 
    //closing modal by clicking on background
    modal.addEventListener('click', (e) => {
        if (e.target === modal && modal.classList.contains('show')) {
            // modal.classList.add('hide');
            // modal.classList.remove('show');
            // document.body.style.overflow = '';
            closeModal();
        }
    });
    //for avoidance of repeating the same code draw it into a separate function:
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    function showModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';//to block scrolling page
        clearInterval(modalTimerId);
    }
    //and then adjust the rest of your code like this:
    //modalClose.addEventListener('click', closeModal);


    //to close modal by clicking on 'Esc' key
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            // modal.classList.add('hide');
            // modal.classList.remove('show');
            // document.body.style.overflow = '';
            closeModal();
        }
    });

    //to show modal after a while from opening page by user, exploit the setTimeout method:
    const modalTimerId = setTimeout(showModal, 5000);

    //to show modal after scrolling the page to its buttom
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }  
    }
    window.addEventListener('scroll', showModalByScroll);
    


});
