export default (
  <style>{`
    .protondb-decky-indicator {
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

    .protondb-decky-indicator.gpfocus, .protondb-decky-indicator:hover {
    filter: brightness(1.3);
    }

    .protondb-decky-indicator span {
    height: max-content;
    font-family: Abel,"Motiva Sans",Arial,Helvetica,sans-serif;
    }

    .protondb-decky-indicator-platinum {
    background: rgb(180, 199, 220);
    color: #000000;
    outline-color: rgb(180, 199, 220);
    }

    .protondb-decky-indicator-gold {
    background: rgb(207, 181, 59);
    color: #000000;
    outline-color: rgb(207, 181, 59);
    }

    .protondb-decky-indicator-silver {
    background: rgb(166, 166, 166);
    color: #000000;
    outline-color: rgb(166, 166, 166);
    }

    .protondb-decky-indicator-bronze {
    background: rgb(205, 127, 50);
    color: #000000;
    outline-color: rgb(205, 127, 50);
    }

    .protondb-decky-indicator-borked {
    background: red;
    color: #000000;
    outline-color: red;
    }

    .protondb-decky-indicator-pending {
    background: rgb(68, 68, 68);
    color: #FFFFFF;
    outline-color: rgb(68, 68, 68);
    }

    .protondb-decky-indicator-regular {
    flex-direction: row;
    padding: 6px 18px;
    }

    .protondb-decky-indicator-regular > span {
    margin-left: 10px;
    font-size: 24px;
    width: 132px;
    line-height: 24px;
    margin-right: 28px;
    }

    .protondb-decky-indicator-small {
    flex-direction: column;
    padding: 6px 8px;
    }

    .protondb-decky-indicator-small > span {
    margin-left: 0;
    font-size: 12px;
    width: auto;
    line-height: 12px;
    margin-right: 0;
    }


    .protondb-decky-indicator-minimalist {
    padding: 6px;
    flex-direction: column;
    }

    .protondb-decky-indicator-minimalist > div{
    height: 20px;
    }

    .protondb-decky-indicator-minimalist > span {
    display: none;
    }

    .protondb-decky-indicator-label-on-hover.gpfocus > span {
    display: block;
    }
`}</style>
)
