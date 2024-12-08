/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./src/js/files/functions.js
let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

function menuOpen() {
  window.addEventListener("load", function () {
    document.addEventListener("click", function (e) {
      const targetElement = e.target;
      if (!targetElement.closest(".icon-menu")) return;
      if (targetElement.closest(".icon-menu")) {
        document.documentElement.classList.toggle("menu-open");
        document.documentElement.classList.toggle("lock");
      }
    });
  });
}
function dataMediaQueries(array, dataSetValue) {
  // Получение объектов с медиа-запросами
  const media = Array.from(array).filter(function (item, index, self) {
    if (item.dataset[dataSetValue]) {
      return item.dataset[dataSetValue].split(",")[0];
    }
  });
  // Инициализация объектов с медиа-запросами
  if (media.length) {
    const breakpointsArray = [];
    media.forEach(item => {
      const params = item.dataset[dataSetValue];
      const breakpoint = {};
      const paramsArray = params.split(",");
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });
    // Получаем уникальные брейкпоинты
    let mdQueries = breakpointsArray.map(function (item) {
      return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
    });
    mdQueries = uniqArray(mdQueries);
    const mdQueriesArray = [];

    if (mdQueries.length) {
      // Работаем с каждым брейкпоинтом
      mdQueries.forEach(breakpoint => {
        const paramsArray = breakpoint.split(",");
        const mediaBreakpoint = paramsArray[1];
        const mediaType = paramsArray[2];
        const matchMedia = window.matchMedia(paramsArray[0]);
        // Объекты с необходимыми условиями
        const itemsArray = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true;
          }
        });
        mdQueriesArray.push({
          itemsArray,
          matchMedia
        })
      });
      return mdQueriesArray;
    }
  }
}
;// CONCATENATED MODULE: ./src/js/files/modules.js
const flsModules = {};
;// CONCATENATED MODULE: ./src/js/files/forms.js
// export function formSubmit() {
//   const forms = document.forms;
//   if (forms.length) {
//     for (const form of forms) {
//       // form.addEventListener("submit", formSend);
//       form.addEventListener("submit", function (e) {
//         const form = e.target;
//         formSubmitActions(form, e);
//       });
//     }
//   }
//   async function formSubmitActions(form, e) {
//     e.preventDefault();
//     const error = formValidate(form);

// import { flsModules } from "./modules.js";

//     let formData = new FormData(form);

//     // if (error === 0) {
//     //   let response = await fetch("./files/sendmail.php", {
//     //     method: "POST",
//     //     body: formData,
//     //   });
//     //   if (response.ok) {
//     //     let result = await response.json();
//     //     alert(result.message);
//     //     form.reset();
//     //     console.log("response ok");
//     //   }
//     // }
//   }
//   function formValidate(form) {
//     let error = 0;
//     const formRequired = form.querySelectorAll("[data-required]");
//     if (formRequired.length) {
//       formRequired.forEach(input => {
//         if (input.dataset.required === "email") {
//           if (emailTest(input)) {
//             formAddError(input);
//             error++;
//           }
//         } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
//           formAddError(input);
//           error++;
//         } else {
//           if (input.value === "") {
//             formAddError(input);
//             error++;
//           } else {
//             formRemoveError(input);
//           }
//         }
//       });
//     }
//     return error;
//   }
//   function formAddError(input) {
//     input.parentElement.classList.add("_form-error");
//     input.classList.add("_form-error");
//     const inputError = input.parentElement.querySelector(".form-error");
//     if (inputError) input.parentElement.removeChild(inputError);
//     if (input.dataset.error) {
//       input.parentElement.insertAdjacentHTML("beforeend", `<div class="form-error">${input.dataset.error}</div>`)
//     }

//   }
//   function formRemoveError(input) {
//     input.parentElement.classList.remove("_form-error");
//     input.classList.remove("_form-error");
//     if (input.parentElement.querySelector(".form-error")) {
//       input.parentElement.removeChild(input.parentElement.querySelector(".form-error"));
//     }
//   }
//   function emailTest(input) {
//     return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
//   }
//   function formsFieldinit() {
//     document.body.addEventListener("focusin", function (e) {
//       const targetElement = e.target;
//       if (targetElement.tagName === "INPUT") {
//         formRemoveError(targetElement);
//         console.log("Фокус на инпуте");
//       }
//     });
//   }
// }



function formsFieldsInit(options = { viewpass: false, maskTel: false, valid: false }) {
  document.body.addEventListener("focusin", function (e) {
    const targetElement = e.target;
    if (targetElement.tagName === "INPUT" || targetElement.tagName === "TEXTAREA") {
      targetElement.parentElement.classList.add("_form-focus");
      targetElement.classList.add("_form-focus");
      formValidate.removeErrorClass(targetElement);
      formValidate.errorRemoveBlock(targetElement);
    }
  });
  document.body.addEventListener("focusout", function (e) {
    const targetElement = e.target;
    if (targetElement.tagName === "INPUT" || targetElement.tagName === "TEXTAREA") {
      targetElement.parentElement.classList.remove("_form-focus");
      targetElement.classList.remove("_form-focus");
    }
    targetElement.hasAttribute("data-validate") ? formValidate.validateInput(targetElement) : null;
    // setTimeout(function () {
    //   if (targetElement.value.length === 0) {
    //     formValidate.removeErrorClass(targetElement);
    //     formValidate.errorRemoveBlock(targetElement);
    //   }
    // }, 5000);
  });
  if (options.viewpass) {
    document.addEventListener("click", function (e) {
      const targetElement = e.target;
      if (targetElement.closest(`[class*="__viewpass"]`)) {
        let inputPasswordType = targetElement.classList.contains("_viewpass-active") ? "password" : "text";
        targetElement.parentElement.querySelector("input").setAttribute("type", inputPasswordType);
        targetElement.classList.toggle("_viewpass-active");
      }
    });
  }
  if (options.maskTel) {
    const phoneInput = document.querySelectorAll("[data-tel-input]");
    if (phoneInput) {
      phoneInput.forEach(input => {
        input.addEventListener("input", onPhoneInput);
        input.addEventListener("keydown", onPhoneKeyDown);
        input.addEventListener("paste", onPhonePaste);
        input.addEventListener("focusin", onInputFocus);
        input.addEventListener("focusout", onInputFocusOut);
      });
    }
    function onPhoneInput(e) {
      const input = e.target;
      let inputNumbersValue = getInputNumbersValue(input);
      let formattedInputValue = "";
      let selecitonStart = input.selectionStart;
      if (!inputNumbersValue) {
        return input.value = "";
      }
      if (input.value.length != selecitonStart) {
        if (e.data && /\D/g.test(e.data)) {
          input.value = inputNumbersValue;
        }
        return;
      }
      if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
        input.setAttribute("maxlength", "18");
        // Русский номер телефона
        if (inputNumbersValue[0] == "8") {
          input.setAttribute("maxlength", "17");
        }
        if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
        let firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
        formattedInputValue = firstSymbols + " ";
        if (inputNumbersValue.length > 1) {
          formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
        }
        if (inputNumbersValue.length >= 5) {
          formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
        }
        if (inputNumbersValue.length >= 8) {
          formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
        }
        if (inputNumbersValue.length >= 10) {
          formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
        }
      } else {
        input.setAttribute("maxlength", "12");
        // НЕ Русский номер телефона
        formattedInputValue = "+" + inputNumbersValue.substring(0, 11);
      }
      input.value = formattedInputValue;
    }
    function getInputNumbersValue(input) {
      return input.value.replace(/\D/g, "");
    };
    function onPhoneKeyDown(e) {
      const input = e.target;
      if (e.keyCode == 8 && getInputNumbersValue(input).length == 1) {
        input.value = "";
        if (input.hasAttribute("data-input-valid")) {
          formValidate.removeValidClass(input);
          formValidate.removeErrorClass(input);
        }
      }
    };
    function onPhonePaste(e) {
      const pasted = e.clipboardData || window.Clipboard;
      const input = e.target;
      const inputNumbersValue = getInputNumbersValue(input);
      if (pasted) {
        const pastedText = pasted.getData("Text");
        if (/\D/g.test(pastedText)) {
          input.value = inputNumbersValue;
        }
      };
    };
    function onInputFocus(e) {
      const input = e.target;
      if (input.dataset.inputLabel) {
        input.parentElement.insertAdjacentHTML("beforeend", `<div class="form__label-block">${input.dataset.inputLabel}</div>`);
      }
    };
    function onInputFocusOut(e) {
      const input = e.target;
      if (input.parentElement.querySelector('.form__label-block')) {
        input.parentElement.removeChild(input.parentElement.querySelector('.form__label-block'));
      }
    };
  }
  // if (options.valid) {
  //   const inputValid = document.querySelectorAll("[data-input-valid]");
  //   if (inputValid) {
  //     inputValid.forEach(inputValidEl => {
  //       inputValidEl.addEventListener("input", function () {
  //         if (inputValidEl.value !== "") {
  //           inputValidEl.classList.add("_input-valid", "_input-valid-success");
  //         } else {
  //           inputValidEl.classList.remove("_input-valid", "_input-valid-success");
  //           formValidate.removeErrorClass(inputValidEl);
  //         }

  //         if (inputValidEl.hasAttribute("data-min-length")) {
  //           const inputMinLength = inputValidEl.dataset.minLength;
  //           if (inputValidEl.value.length < inputMinLength) {
  //             inputValidEl.classList.remove("_input-valid-success");
  //             formValidate.addErrorClass(inputValidEl);
  //             if (inputValidEl.value == "") {
  //               formValidate.removeErrorClass(inputValidEl);
  //             }
  //           } else {
  //             inputValidEl.classList.add("_input-valid-success");
  //             formValidate.removeErrorClass(inputValidEl);
  //           }
  //         }

  //         if (inputValidEl.hasAttribute("data-tel-input")) {
  //           const inputPhoneMask = inputValidEl.getAttribute("maxlength");
  //           if (inputValidEl.value.length < inputPhoneMask) {
  //             inputValidEl.classList.remove("_input-valid-success");
  //             formValidate.addErrorClass(inputValidEl);
  //             if (inputValidEl.value.length == 0) {
  //               formValidate.removeErrorClass(inputValidEl);
  //             }
  //           } else {
  //             inputValidEl.classList.add("_input-valid-success");
  //             formValidate.removeErrorClass(inputValidEl);
  //           }
  //         }
  //       })

  //     })
  //   }
  // }

  if (options.valid) {
    const inputValid = document.querySelectorAll("[data-input-valid]");
    if (inputValid) {
      inputValid.forEach(inputValidEl => {
        inputValidEl.addEventListener("input", function () {
          if (inputValidEl.value !== "") {
            formValidate.addValidClass(inputValidEl);
            formValidate.addValidSuccessClass(inputValidEl);
          } else {
            formValidate.removeErrorClass(inputValidEl);
            formValidate.removeValidClass(inputValidEl);
            formValidate.removeValidSuccessClass(inputValidEl);
          }

          if (inputValidEl.hasAttribute("data-min-length")) {
            const inputMinLength = inputValidEl.dataset.minLength;
            if (inputValidEl.value.length < inputMinLength) {
              formValidate.removeValidSuccessClass(inputValidEl);
              formValidate.addErrorClass(inputValidEl);
              if (inputValidEl.value == "") {
                formValidate.removeErrorClass(inputValidEl);
              }
            } else {
              formValidate.addValidSuccessClass(inputValidEl);
              formValidate.removeErrorClass(inputValidEl);
            }
          }

          if (inputValidEl.hasAttribute("data-max-length")) {
            const inputMaxLength = inputValidEl.dataset.maxLength;
            if (inputValidEl.value.length > inputMaxLength) {
              formValidate.removeValidSuccessClass(inputValidEl);
              formValidate.addErrorClass(inputValidEl);
            } else {
              formValidate.addValidSuccessClass(inputValidEl);
              formValidate.removeErrorClass(inputValidEl);
              formValidate.addValidClass(inputValidEl);
            }
            if (inputValidEl.value == '') {
              formValidate.removeValidClass(inputValidEl);
              formValidate.removeValidSuccessClass(inputValidEl);
            }
          }

          if (inputValidEl.hasAttribute("data-tel-input")) {
            const inputPhoneMask = inputValidEl.getAttribute("maxlength");
            if (inputValidEl.value.length < inputPhoneMask) {
              formValidate.removeValidSuccessClass(inputValidEl);
              formValidate.addErrorClass(inputValidEl);
              if (inputValidEl.value == "") {
                formValidate.removeErrorClass(inputValidEl);
              }
            } else {
              inputValidEl.classList.add("_input-valid-success");
              formValidate.removeErrorClass(inputValidEl);
            }
          }
        })

      })
    }
  }

};
let formValidate = {
  getErrors(form) {
    let error = 0;
    const formRequired = form.querySelectorAll("[data-required]");
    formRequired.forEach(input => {
      error += this.validateInput(input);
    });
    return error;
  },
  validateInput(input) {
    let error = 0;
    if (input.dataset.required === "tel") {
      if (input.value.length < input.getAttribute("maxlength")) {
        formValidate.errorAddBlock(input, `Введите корректный номер телефона`);
        formValidate.addErrorClass(input);
        error++;
      }
    }
    if (input.dataset.maxLength) {
      if (input.value.length > input.dataset.maxLength) {
        formValidate.errorAddBlock(input, `Максимальное количество символов ${input.dataset.maxLength}`);
        formValidate.addErrorClass(input);
        error++;
      }
    }
    if (input.dataset.minLength) {
      if (input.value.length < input.dataset.minLength) {
        formValidate.errorAddBlock(input, `Минимальное количество символов ${input.dataset.minLength}`);
        formValidate.addErrorClass(input);
        error++;
      }
    }
    if (input.dataset.required === "email") {
      if (formValidate.emailTest(input)) {
        formValidate.errorAddBlock(input, `Введите корректный email`);
        formValidate.addErrorClass(input);
        error++;
      }
    } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
      formValidate.addErrorClass(input);
      error++;
    }
    if (input.value === "") {
      formValidate.errorAddBlock(input, "Заполните это поле");
      formValidate.addErrorClass(input);
      error++;
    }
    return error;
  },
  addErrorClass(input) {
    input.parentElement.classList.add("_form-error");
    input.classList.add("_form-error");
  },
  removeErrorClass(input) {
    input.parentElement.classList.remove("_form-error");
    input.classList.remove("_form-error");
  },
  emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  },
  errorAddBlock(input, text) {
    const errorBlock = input.parentElement.querySelector(".input-error");
    if (errorBlock) input.parentElement.removeChild(errorBlock);
    input.parentElement.insertAdjacentHTML("beforeend", `<div class="input-error">${text}</div>`)
  },
  errorRemoveBlock(input) {
    if (input.parentElement.querySelector(".input-error")) {
      input.parentElement.removeChild(input.parentElement.querySelector(".input-error"));
    }
  },
  addValidClass(input) {
    input.classList.add("_input-valid");
  },
  removeValidClass(input) {
    input.classList.remove("_input-valid");
  },
  addValidSuccessClass(input) {
    input.classList.add("_input-valid-success");
  },
  removeValidSuccessClass(input) {
    input.classList.remove("_input-valid-success");
  },
}
function formSubmit() {
  const forms = document.forms;
  if (forms.length) {
    for (const form of forms) {
      form.addEventListener("submit", function (e) {
        const form = e.target;
        formSubmitActions(form, e);
      });
    }
  }
  async function formSubmitActions(form, e) {
    const error = formValidate.getErrors(form);
    if (error === 0) {
      const ajax = form.hasAttribute("data-ajax");
      if (ajax) {
        e.preventDefault();
        const formAction = form.getAttribute("action") ? form.getAttribute("action").trim() : "#";
        const formMethod = form.getAttribute("method") ? form.getAttribute("method").trim() : "GET";
        const formData = new FormData(form);

        form.classList.add("_sending");

        const response = await fetch(formAction, {
          method: formMethod,
          body: formData
        });
        if (response.ok) {
          // let responseResult = await response.json();
          formSent(form);
          form.classList.remove("_sending");
        } else {
          form.setAttribute("data-response-error", "#response-error");
          if (flsModules.popup) {
            const popup = form.dataset.responseError;
            popup ? flsModules.popup.open(popup) : null;
          };
          form.removeAttribute("data-response-error");
          form.classList.remove("_sending");
        }
      } else if (form.hasAttribute("data-dev")) {
        e.preventDefault();
        formSent(form);
      }
    } else {
      e.preventDefault();
    }
  }

  function formSent(form, responseResult = '') {
    document.dispatchEvent(new CustomEvent("formSent", {
      detail: {
        form: form
      }
    }));
    if (flsModules.popup) {
      const popup = form.dataset.popupMessage;
      popup ? flsModules.popup.open(popup) : null;
    }
    form.reset();
  };
}

;// CONCATENATED MODULE: ./src/js/libs/dynamic_adapt.js
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

class DynamicAdapt {
  constructor(type) {
    this.type = type
  }
  init() {
    // массив объектов
    this.оbjects = []
    this.daClassname = '_dynamic_adapt_'
    // массив DOM-елементов
    this.nodes = [...document.querySelectorAll('[data-da]')]

    // наполнение оbjects объектами
    this.nodes.forEach((node) => {
      const data = node.dataset.da.trim()
      const dataArray = data.split(',')
      const оbject = {}
      оbject.element = node
      оbject.parent = node.parentNode
      оbject.destination = document.querySelector(`${dataArray[0].trim()}`)
      оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767'
      оbject.place = dataArray[2] ? dataArray[2].trim() : 'last'
      оbject.index = this.indexInParent(оbject.parent, оbject.element)
      this.оbjects.push(оbject)
    })

    this.arraySort(this.оbjects)

    // массив уникальных медиа-запросов
    this.mediaQueries = this.оbjects
      .map(({ breakpoint }) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
      .filter((item, index, self) => self.indexOf(item) === index)

    // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске
    this.mediaQueries.forEach((media) => {
      const mediaSplit = media.split(',')
      const matchMedia = window.matchMedia(mediaSplit[0])
      const mediaBreakpoint = mediaSplit[1]

      //массив объектов с соответствующим брейкпоинтом
      const оbjectsFilter = this.оbjects.filter(({ breakpoint }) => breakpoint === mediaBreakpoint)
      matchMedia.addEventListener('change', () => {
        this.mediaHandler(matchMedia, оbjectsFilter)
      })
      this.mediaHandler(matchMedia, оbjectsFilter)
    })
  }
  // Основная функция
  mediaHandler(matchMedia, оbjects) {
    if (matchMedia.matches) {
      оbjects.forEach((оbject) => {
        // оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.moveTo(оbject.place, оbject.element, оbject.destination)
      })
    } else {
      оbjects.forEach(({ parent, element, index }) => {
        if (element.classList.contains(this.daClassname)) {
          this.moveBack(parent, element, index)
        }
      })
    }
  }
  // Функция перемещения
  moveTo(place, element, destination) {
    element.classList.add(this.daClassname)
    if (place === 'last' || place >= destination.children.length) {
      destination.append(element)
      return
    }
    if (place === 'first') {
      destination.prepend(element)
      return
    }
    destination.children[place].before(element)
  }
  // Функция возврата
  moveBack(parent, element, index) {
    element.classList.remove(this.daClassname)
    if (parent.children[index] !== undefined) {
      parent.children[index].before(element)
    } else {
      parent.append(element)
    }
  }
  // Функция получения индекса внутри родительского элемента
  indexInParent(parent, element) {
    return [...parent.children].indexOf(element)
  }
  // Функция сортировки массива по breakpoint и place
  // по возрастанию для this.type = min
  // по убыванию для this.type = max
  arraySort(arr) {
    if (this.type === 'min') {
      arr.sort((a, b) => {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0
          }
          if (a.place === 'first' || b.place === 'last') {
            return -1
          }
          if (a.place === 'last' || b.place === 'first') {
            return 1
          }
          return 0
        }
        return a.breakpoint - b.breakpoint
      })
    } else {
      arr.sort((a, b) => {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0
          }
          if (a.place === 'first' || b.place === 'last') {
            return 1
          }
          if (a.place === 'last' || b.place === 'first') {
            return -1
          }
          return 0
        }
        return b.breakpoint - a.breakpoint
      })
      return
    }
  }
}
const da = new DynamicAdapt("max");
da.init();
;// CONCATENATED MODULE: ./src/js/files/script.js


window.addEventListener("load", function () {
  document.addEventListener("click", documentAction);
});
window.addEventListener("resize", resizeWindow)

function documentAction(e) {
  const targetElement = e.target;

  // if (isMobile.any()) {
  if (targetElement.closest(".actions-header__current")) {
    const parentItem = targetElement.closest(".actions-header__item");
    const activeItem = document.querySelector("._show-dropdown");
    parentItem.classList.toggle("_show-dropdown");
    if (window, innerWidth > 489.98) {
      if (activeItem && activeItem !== targetElement) {
        activeItem.classList.remove("_show-dropdown");
      }
    }
  } else if (!targetElement.closest(".actions-header__item") && document.querySelector(".drop-menu")) {
    document.querySelectorAll(".actions-header__item").forEach(item => item.classList.remove("_show-dropdown"));
  }
  // }
}

function resizeWindow() {

  if (document.querySelector(".actions-header__button")) {
    if (window.innerWidth < 489.98) {
      document.querySelector(".actions-header__button").setAttribute("aria-label", "login")
    } else {
      document.querySelector(".actions-header__button").removeAttribute("aria-label");
    }
  }
}


// Скролл шапки

const headerElement = document.querySelector(".header");

const callback = (entries) => {
  if (entries[0].isIntersecting) {
    headerElement.classList.remove("_header-scroll")
  } else {
    headerElement.classList.add("_header-scroll")
  }
}


const observer = new IntersectionObserver(callback);
observer.observe(headerElement)
;// CONCATENATED MODULE: ./src/js/app.js


menuOpen();



formsFieldsInit({
  viewpass: false,
  maskTel: false,
  valid: false,
});

formSubmit();




/******/ })()
;