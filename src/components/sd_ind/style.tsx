export default (
  <style>{`
    .sdhq-indicator {
    border: none;
    position: absolute;
    z-index: 20;
    display: flex;
    align-items: center;
    width: max-content;
    height: max-content;
    border-radius: 0;
    color: black;
    }

    .sdhq-indicator.gpfocus, .sdhq-indicator:hover {
    filter: brightness(1.3);
    }

    .sdhq-indicator span {
    height: max-content;
    font-family: Arial,Helvetica,sans-serif;
    }

    .sdhq-indicator-5_star {
    background: rgb(180, 199, 220);
    color: #000000;
    outline-color: rgb(180, 199, 220);
    }

    .sdhq-indicator-4_star {
    background: rgb(207, 181, 59);
    color: #000000;
    outline-color: rgb(207, 181, 59);
    }

    .sdhq-indicator-3_star {
    background: rgb(166, 166, 166);
    color: #000000;
    outline-color: rgb(166, 166, 166);
    }

    .sdhq-indicator-2_star {
    background: rgb(205, 127, 50);
    color: #000000;
    outline-color: rgb(205, 127, 50);
    }

    .sdhq-indicator-1_star {
    background: red;
    color: #000000;
    outline-color: red;
    }

    .sdhq-indicator-pending {
    background: rgb(68, 68, 68);
    color: #FFFFFF;
    outline-color: rgb(68, 68, 68);
    }

    .sdhq-indicator-regular {
    flex-direction: row;
    padding: 6px 18px;
    }

    .sdhq-indicator-regular > span {
    margin-left: 10px;
    font-size: 24px;
    width: 132px;
    line-height: 24px;
    margin-right: 28px;
    }

    .sdhq-indicator-small {
    flex-direction: column;
    padding: 6px 8px;
    }

    .sdhq-indicator-small > span {
    margin-left: 0;
    font-size: 12px;
    width: auto;
    line-height: 12px;
    margin-right: 0;
    }

    .sdhq-indicator-minimalist {
    padding: 6px;
    flex-direction: column;
    }

    .sdhq-indicator-minimalist > div{
    height: 20px;
    }

    .sdhq-indicator-minimalist > span {
    display: none;
    }

    .sdhq-indicator-label-on-hover.gpfocus > span {
    display: block;
    }
`}</style>
)
