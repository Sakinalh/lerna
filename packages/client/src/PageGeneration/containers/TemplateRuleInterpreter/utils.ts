function strToDoc(serialized: string) {
  const parser = new DOMParser();
  return parser.parseFromString(serialized, "text/html");
}

function appendScript(
  doc: Document,
  scriptContent: string,
  classContent: string
) {
  const head = doc.head || doc.getElementsByTagName("head")[0];
  head.insertAdjacentHTML("beforeend", classContent);
  // try ignore all error
  /*    const catchErr = window.document.createElement("script");
      catchErr.setAttribute("type", "text/javascript");
      catchErr.innerHTML =
          "window.onerror = function(e){console.log('IGNORE ERR 1', e); return true;}";
      doc.body.prepend(catchErr); */

  const script = window.document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.innerHTML = scriptContent;
  doc.body.appendChild(script);

  return doc;
}

export function transformTemplate(template, _meta) {
  const htmlDoc = strToDoc(template);

  const code = `
    const meta = window.parent.__naister_template_meta;
    // prevent popup
    window.alias_open = window.open;
    window.open = function (url, name, specs, replace) {
        return
    };


    //message with parent iframe

    function handleDisplayCtaOverlay(act) {
        const body = window.document.querySelector('body');
        if (act === 'show') {
            body.classList.add('naister__show_cta');
            return;
        }
        body.classList.remove('naister__show_cta');
    }

    function handleParentAction(payload) {
        var key = payload.message ? "message" : "data";
        var data = payload[key];
        if (data) {
            const next = data === 'areas' ? 'show' : 'hide';
            handleDisplayCtaOverlay(next);

            //  https://stackoverflow.com/questions/52673617/js-queryselectorall-not-a-valid-selector-despite-it-being-like-the-docs-example
            /*  var concat='[data-cta-parent="'.concat(data,'"]');
                
            var el= document.querySelector(concat);
            
            if( el){
                el.classList.add("item_selected");
            }
            
            */
        }
    }

    window.addEventListener("message", handleParentAction, false);

    //custom script
    document.addEventListener("DOMContentLoaded", function (event) {
        var naister_attr = "data-naister_id";
        try {
            const parentURL = window.parent.location.origin;

            function addCustomChildEl(el) {

                if (!el) {
                    return;
                }

                const uuid = el.dataset.naister_id;
                const uuidMeta = meta[uuid];
                // check that uuid exists in meta (typo namely )
                if (uuidMeta) {
                    const isParent = !uuidMeta.parent || uuidMeta.type === 'product';
                    //display option/border only on top element( exclude child block in product)
                    if (isParent) {
                        const btn = window.document.createElement("button");
                        const newContent = document.createTextNode('options');

                        //https://stackoverflow.com/questions/23583050/appendchild-to-list-element-is-only-affecting-the-last-element-of-list
                        //create btn el

                        btn.appendChild(newContent);
                        btn.setAttribute('class', 'naister__btn_option cta_style');
                        btn.setAttribute('data-btn__naister-id', uuid);


                        //create label el
                        const label = window.document.createElement("p");
                        const nodeType = el.nodeName.toLowerCase();
                        const className = el.classList[0] ? el.classList[0] : '';
                        const labelTxt = nodeType.concat(' .', className);
                        const labelContent = document.createTextNode(labelTxt);
                        label.appendChild(labelContent);
                        label.setAttribute('class', 'naister__cta_label cta_style');
                        label.setAttribute('data-btn__naister-label', uuid);

                        /* css magic */

                        //make sure btn/label is positioned relative to  sibling
                        el.style.position = "relative";
                        //https://stackoverflow.com/questions/10624771/css-sibling-absolute-positioning
                        // when multiple uuid share same parent, force the first on top
                        //the rest inherit vertical position
                        //    btn.style.top=0;
                        //  label.style.top=0;
                        

                        //append class && elements

                        el.classList.add("naister__cta");

                        if (el.tagName === "IMG") {
                            //for img tag, insert to parent element. cannot have child element
                            el.parentNode.classList.add("naister__cta__block");
                            el.parentNode.insertBefore(label, el);
                            el.parentNode.insertBefore(btn, el);

                        } else {
                            el.classList.add("naister__cta__block");
                            btn.style.top = 0;
                            label.style.top = 0;
                            el.appendChild(label);
                            el.appendChild(btn);
                        }
                    }
                }
            }

            function walkDOM(node, func) {
                func(node);
                node = node.firstChild;
                while (node) {
                    walkDOM(node, func);
                    node = node.nextSibling;
                }
            }


            // add custom element     
            const actions = window.document.querySelectorAll("[data-naister_id]");

            actions.forEach(
                function (currentValue, currentIndex, listObj) {

                    addCustomChildEl(currentValue);


                });
            const popup = window.document.querySelector(".inVqrA");

            if (popup) {
                popup.remove();
            }


            // override event
            walkDOM(document.getElementsByTagName("body")[0], function (el) {

                el.onclick = function (ev) {
                    ev.stopPropagation();
                    ev.preventDefault();
                    //const parent = el.parentNode;

                    // const getDataIdEl=el.querySelector("[data-naister_id]");

                    //if( !getDataIdEl){
                    // console.warn('found more than node for ',  parent.attributes) ;
                    // return 
                    // }

                    //   

                    const elUuid = el.dataset.btn__naisterId;

                    if (!elUuid) {
                        return false;
                    }

                    window.parent.postMessage({
                        id: elUuid
                    }, parentURL);
                    return false;
                };
                return el;
            });

        } catch (error) {
            console.debug(error)
        }

    })
  `;

  const className = `<style>
    .naister__show_cta .naister__cta__block { 
            outline: 2px solid #47A2E3;
    }
    .naister__show_cta  .naister__btn_option{
            opacity: 1;
        }
    .naister__show_cta  .naister__cta_label{
            opacity: 1;
        }
    
    .naister__show_cta .naister__cta__block .cta_style { 
          opacity: 1;

    }
    .naister__cta__block{
        outline: transparent solid 1px;
        outline-offset:-1px;
        position:relative;
        width:100%;
        display: block;
    }

    .naister__cta__block .cta_style{
        background: #47A2E3;
        color:white;
        font-size: 12px;
        z-index: 999;
        border-radius: inherit;
        margin: 0;
        min-height: 20px;
        opacity: 0;
    }

    .naister__cta__block .cta_style::first-letter{
        text-transform: capitalize
    }
    

    button.naister__btn_option{
        padding:2px 20px;
        position: absolute;
        opacity: 1;
        right:0;
    }
   

    p.naister__cta_label{
        padding:2px 12px;
        position: absolute;
        opacity: 1;
        line-height: normal;
        max-width: 150px;
    }
    

    .item_selected{
        outline: green solid 1px;
        outline-offset:-1px;
    }
    </style>`;

  return appendScript(htmlDoc, code, className);
}

export function docToStr(doc: Document) {
  const s = new XMLSerializer();
  return s.serializeToString(doc);
}
