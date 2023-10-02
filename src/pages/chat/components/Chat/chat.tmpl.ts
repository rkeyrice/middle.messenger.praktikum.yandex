import css from "./chat.module.scss";

export const tmpl = `
<li  class=${css.chats_item}>
   <div class=${css.img}></div>
    <div class=${css.text_content}>
        <div class=${css.name}>{{name}}</div>
         <p>{{message}}</p>
    </div>
    <div>
        <div class=${css.time}>
            {{time}}
        </div>
        {{#if unreadMessages}}
        <div class=${css.unreadMessages}>
             {{unreadMessages}}
        </div>
        {{/if}} 
    </div>
</li>
`;
