import css from './optionsButton.module.scss';

export const tmpl = `
<div class="${css.wrapper}">
    <button>
    <svg xmlns="http://www.w3.org/2000/svg" width="3" height="16" viewBox="0 0 3 16" fill="none">
    <circle cx="1.5" cy="2" r="1.5" fill="#1E1E1E"/>
    <circle cx="1.5" cy="8" r="1.5" fill="#1E1E1E"/>
    <circle cx="1.5" cy="14" r="1.5" fill="#1E1E1E"/>
    </svg>
    <div  class="${css.list}">
        {{{buttons}}}
    </div>
    </button>
</div>
<div id="edit_users" class=${css['popup-wrapper']}>
{{{popup}}}
</div>
`;
