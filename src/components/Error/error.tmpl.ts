import css from './error.module.scss';

export const tmpl = `
    <main class=${css.wrapper}>
        <div class=${css.title}>{{number}}</div>
        <div class=${css.text}>{{text}}</div>
        <div id="go_back">{{{button}}}</div>
    </main>
`;
