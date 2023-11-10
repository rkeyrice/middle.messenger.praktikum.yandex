import css from './chat.module.scss';

export const tmpl = `
<li  class=${css['chats-item']}>
   <div class=${css.img}></div>
    <span class=${css['text-content']}>
        <div class=${css.name}>{{title}}</div>
         <p>{{last_message}}</p>
    </span>
    <div>
        <div class=${css.time}>
            {{time}}
        </div>
        {{#if unread_count}}
        <div class=${css['unread-messages']}>
             {{unread_count}}
        </div>
        {{/if}} 
    </div>
</li>
`;
