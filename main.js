(()=>{"use strict";var e={baseUrl:"https://mesto.nomoreparties.co/wff-cohort-19",headers:{authorization:"8fbe9b57-b101-4d39-9a96-f458ef7d7562","Content-Type":"application/json"}};function t(t,n,o,r,c){var a=n.querySelector(".places__item").cloneNode(!0),u=a.querySelector(".card__image");u.src=o.link,u.alt=o.name,a.querySelector(".card__title").textContent=o.name;var i=a.querySelector(".card__like-button"),s=function(e){a.querySelector(".card__like-button_counter").textContent=e},l=o.likes.some((function(e){return e._id===t}));l&&i.classList.add("card__like-button_is-active");var d=a.querySelector(".card__delete-button");return o.owner._id===t?d.addEventListener("click",(function(){r(o,a)})):d.remove(),u.addEventListener("click",(function(){c(u)})),i.addEventListener("click",(function(t){console.log(l),function(t,n,o,r){t&&n.classList.contains("card__like-button_is-active")?function(t){return fetch("".concat(e.baseUrl,"/cards/like/").concat(t._id),{headers:e.headers,method:"DELETE"}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(o).then((function(e){n.classList.remove("card__like-button_is-active"),r(e.likes.length)})).catch((function(e){console.log(e)})):function(t){return fetch("".concat(e.baseUrl,"/cards/like/").concat(t._id),{headers:e.headers,method:"PUT"}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(o).then((function(e){r(e.likes.length),n.classList.add("card__like-button_is-active")})).catch((function(e){console.log(e)}))}(l,t.target,o,s)})),s(o.likes.length),a}function n(e){e.classList.add("popup_is-opened"),e.addEventListener("mousedown",r),document.addEventListener("keydown",c)}function o(e){e.classList.remove("popup_is-opened"),e.removeEventListener("click",r),document.removeEventListener("keydown",c)}function r(e){e.stopPropagation();var t=e.target;t.classList.contains("popup_is-opened")&&o(t.closest(".popup"))}function c(e){e.stopPropagation();var t=document.querySelector(".popup_is-opened");"Escape"===e.code&&o(t)}var a=function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""},u=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))};function i(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));n.forEach((function(n){a(e,n,t)})),u(n,e.querySelector(t.submitButtonSelector),t)}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}var l,d,p="ac4375325414163f8c6ce413",f=document.querySelector("#card-template").content,m=document.querySelector(".places__list"),_=document.querySelector(".popup_type_edit"),y=document.querySelector(".popup_type_new-card"),v=document.querySelector(".popup_type_avatar"),h=document.querySelector(".popup_type_delete"),S=document.querySelector(".profile__edit-button"),b=document.querySelector(".profile__add-button"),q=document.querySelector(".profile__image"),g=document.querySelectorAll(".popup__close"),k=document.querySelector('form[name="edit-profile"]'),E=k.querySelector(".popup__input_type_name"),L=k.querySelector(".popup__input_type_description"),C=document.querySelector(".profile__info"),j=C.querySelector(".profile__title"),P=C.querySelector(".profile__description"),A=document.querySelector('form[name="edit-avatar"]'),x=A.querySelector(".popup__input_type_avatar"),U=document.querySelector('form[name="new-place"]'),w=U.querySelector(".popup__input_type_card-name"),T=U.querySelector(".popup__input_type_url"),O=document.querySelector('form[name="delete"]');document.querySelectorAll(".popup").forEach((function(e){e.classList.add("popup_is-animated")}));var B={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__input-type-error",errorClass:"popup__input-error_active"};function D(e){var t=document.querySelector(".popup_type_image"),o=t.querySelector(".popup__image");o.src=e.src,o.alt=e.alt,t.querySelector(".popup__caption").textContent=e.alt,n(t)}function I(e,t){d=e,l=t,n(h)}function M(e){j.textContent=e.name,P.textContent=e.about,N(e.avatar)}function N(e){q.style.backgroundImage="url(".concat(e,")")}function J(e,t){t.querySelector(".popup__button").textContent=e?"Сохранение...":"Сохранить"}S.addEventListener("click",(function(e){e.stopPropagation(),i(k,B),E.value=j.textContent,L.value=P.textContent,n(_)})),q.addEventListener("click",(function(e){e.stopPropagation(),n(v)})),b.addEventListener("click",(function(e){e.stopPropagation(),U.reset(),i(U,B),n(y)})),g.forEach((function(e){e.addEventListener("click",(function(e){o(e.target.closest(".popup"))}))})),k.addEventListener("submit",(function(t){!function(t,n){var o;t.preventDefault(),J(!0,_),(o={name:E.value,about:L.value},fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers,method:"PATCH",body:JSON.stringify({name:o.name,about:o.about})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){M(e)})).catch((function(e){console.log(e)})).finally((function(){J(!1,_)})),n(_),k.reset()}(t,o)})),A.addEventListener("submit",(function(t){!function(t,n){var o;t.preventDefault(),J(!0,v),(o={avatar:x.value},fetch("".concat(e.baseUrl,"/users/me/avatar"),{headers:e.headers,method:"PATCH",body:JSON.stringify({avatar:o.avatar})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){N(e)})).catch((function(e){console.log(e)})).finally((function(){J(!1,v)})),q.style.backgroundImage="url(".concat(x.value,")"),n(v),A.reset()}(t,o)})),U.addEventListener("submit",(function(n){!function(t,n,o,r,c){t.preventDefault(),J(!0,y);var a,u=w.value;(a={link:T.value,name:u},fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers,method:"POST",body:JSON.stringify({name:a.name,link:a.link})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){n.prepend(o(p,r,e,I,D))})).catch((function(e){console.log(e)})).finally((function(){J(!1,y)})),c(y)}(n,m,t,f,o)})),O.addEventListener("submit",(function(t){var n,r;t.preventDefault(),n=d,r=l,J(!0,h),function(t){return fetch("".concat(e.baseUrl,"/cards/").concat(t._id),{headers:e.headers,method:"DELETE"}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(n).then((function(){r.remove(),o(h)})).catch((function(e){console.log(e)})).finally((function(){J(!1,h)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);u(n,o,t),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?a(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),r.textContent=o,r.classList.add(n.errorClass)}(e,t,n,t.validationMessage)}(e,r,t),u(n,o,t)}))}))}(t,e)}))}(B),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var n,o,r=(o=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,u=[],i=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(o=c.call(n)).done)&&(u.push(o.value),u.length!==t);i=!0);}catch(e){s=!0,r=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw r}}return u}}(n,o)||function(e,t){if(e){if("string"==typeof e)return s(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}(n,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=r[0],a=r[1];M(c),a.forEach((function(e){m.prepend(t(p,f,e,I,D))}))})).catch((function(e){console.log(e)}))})();