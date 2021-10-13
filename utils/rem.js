
/**********************************************
 * @description 页面适配方案
 */
{
    const docDom = window.document;
    const htmlDom = docDom.documentElement;
    const headerDom = htmlDom.firstElementChild;
    const meteDom_viewport = docDom.querySelector('meta[name="viewport"]')
    const isIPhone = window.navigator.appVersion.match(/iphone/gi);
    const devicePixelRatio = window.devicePixelRatio;
    const charsetDom = docDom.querySelector('meta[charset="UTF-8"]');

    let dpr = 1;
    let scale = undefined;
    let time = null;

    // ios 缩放比列 iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
    if (isIPhone) {
        if (devicePixelRatio >= 3) {
            dpr = 3;
        } else if (devicePixelRatio >= 2) {
            dpr = 2;
        } else {
            dpr = 1;
        }
    }


    scale = 1 / dpr;

    // 设置data-dpi属性，留作的css hack之用 
    htmlDom.setAttribute('data-dpr', dpr);

    // 设置样式 并 动态写入
    meteDom_viewport.setAttribute('content', `initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no`);
    headerDom.insertBefore(charsetDom, meteDom_viewport);

    let resetRem = () => {
        let viewWidth = htmlDom.getBoundingClientRect().width;

        let baseWidth = 750;
        if (viewWidth > 750) {
            baseWidth = viewWidth
        }
        let rem = (viewWidth / baseWidth) * 100
        htmlDom.style.fontSize = rem + 'px';
    }

    resetRem();

    // 窗口发生改变 重新计算res
    window.addEventListener('resize', () => {
        clearTimeout(time);
        time = setTimeout(resetRem, 300);
    }, false);

    window.addEventListener('pageshow', (e) => {
        if (e.persisted) {
            clearTimeout(time);
            time = setTimeout(resetRem, 300);
        }
    }, false);

}
