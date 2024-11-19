import React, { useEffect } from "react";

import "../../index.css";

const AnimatedIcons: React.FC = () => {
  const w: number = window.innerWidth - 200;
  const h: number = window.innerHeight - 150;

  useEffect(() => {
    const hero = document.getElementById("icons") as HTMLElement;
    const svgs = Array.from(hero.querySelectorAll("svg")) as SVGElement[];

    const animateBackgroundIcons = () => {
      const availableSvgs = svgs.filter(
        (svg: SVGElement) => !(svg as any).isAnimating
      );
      const svgToAnimate =
        availableSvgs[Math.floor(Math.random() * availableSvgs.length)];
      if (!svgToAnimate) return;

      svgToAnimate.addEventListener(
        "animationend",
        () => {
          svgToAnimate.classList.remove("animate-moving-background");
          svgToAnimate.removeAttribute("style");
          (svgToAnimate as any).isAnimating = false;
        },
        { once: true }
      );

      svgToAnimate.setAttribute(
        "style",
        `top: ${Math.floor(Math.random() * h)}px;
         left: ${Math.floor(Math.random() * w)}px;`
      );

      svgToAnimate.classList.add("animate-moving-background");
      (svgToAnimate as any).isAnimating = true;
    };

    const intervalId = setInterval(animateBackgroundIcons, 1000);
    animateBackgroundIcons();

    return () => clearInterval(intervalId);
  }, [w, h]);

  return (
    <div className="absolute inset-0 z-10">
      <div
        id="icons"
        className="relative [&>svg]:p-4 [&>svg]:w-24 [&>svg]:h-24 [&>svg]:fill-current [&>svg]:opacity-0 [&>svg]:absolute h-full"
      >
        {Array.from({ length: 30 }).map((_, index) => (
          <svg viewBox="0 0 280 280" key={index}>
            <path
              d="M0 0 C92.4 0 184.8 0 280 0 C280 92.4 280 184.8 280 280 C187.6 280 95.2 280 0 280 C0 187.6 0 95.2 0 0 Z "
              fill="transparent"
              transform="translate(0,0)"
            />
            <path
              d="M0 0 C1.8664194 0.8935826 3.69849927 1.86076757 5.5 2.87890625 C7.06886963 3.760625 7.06886963 3.760625 8.66943359 4.66015625 C9.76852051 5.28792969 10.86760742 5.91570312 12 6.5625 C13.12615723 7.19929687 14.25231445 7.83609375 15.41259766 8.4921875 C22.12453502 12.3048397 28.74732924 16.21807807 35.28125 20.328125 C38.90212131 22.55475276 42.61673591 24.57945174 46.3671875 26.578125 C49.60922387 28.32901705 52.80085416 30.17191666 56 32 C56 43.55 56 55.1 56 67 C53.27782391 65.63891195 50.74646616 64.29096928 48.1640625 62.71484375 C47.07218628 62.04884155 47.07218628 62.04884155 45.95825195 61.36938477 C45.18827881 60.89686279 44.41830566 60.42434082 43.625 59.9375 C42.82860107 59.45015381 42.03220215 58.96280762 41.21166992 58.46069336 C35.12001662 54.71971303 29.09797126 50.88206914 23.11328125 46.97265625 C20.40525118 45.25677772 17.65869272 43.65320052 14.86743164 42.07788086 C11.37514809 40.06213607 7.9746176 37.89767097 4.5625 35.75 C2.066875 34.1825 -0.42875 32.615 -3 31 C-3 37.27 -3 43.54 -3 50 C-0.710625 51.27875 1.57875 52.5575 3.9375 53.875 C14.81757022 59.98444058 25.55724127 66.32029984 36.24609375 72.7578125 C37.34123291 73.41700684 38.43637207 74.07620117 39.56469727 74.75537109 C41.7137129 76.05026435 43.8614163 77.34733884 46.00756836 78.64697266 C51.73643251 82.101458 57.51389125 85.41345493 63.40185547 88.58886719 C67.35336231 90.73505301 71.24363758 92.98003353 75.125 95.25 C75.8778125 95.683125 76.630625 96.11625 77.40625 96.5625 C78.12039062 96.98015625 78.83453125 97.3978125 79.5703125 97.828125 C80.20727051 98.1984082 80.84422852 98.56869141 81.50048828 98.95019531 C83 100 83 100 84 102 C81.39718753 103.54398957 78.79279404 105.08520725 76.1875 106.625 C75.46884766 107.05167969 74.75019531 107.47835937 74.00976562 107.91796875 C72.49955063 108.8094613 70.97859176 109.68294269 69.44873047 110.5402832 C66.92255077 111.98725409 66.92255077 111.98725409 64.44580078 113.91870117 C61.58514241 115.8970492 59.38723237 117.17584502 56 118 C50.90912432 116.64596497 46.84309383 113.92817232 42.5 111.0625 C41.25785823 110.29062126 40.01286279 109.52331691 38.76513672 108.76049805 C36.28731048 107.2385326 33.82512878 105.69547906 31.37402344 104.13085938 C27.03125219 101.38818879 22.59349139 98.84251173 18.125 96.3125 C10.31789873 91.80458385 2.56273141 87.20788478 -5.17919922 82.58911133 C-10.44898067 79.45779908 -15.76877536 76.46079895 -21.18164062 73.58325195 C-22.57672852 72.79954224 -22.57672852 72.79954224 -24 72 C-24.68325851 71.70683395 -25.36651703 71.41366791 -26.07048035 71.11161804 C-28.45133368 69.94564486 -30.14802408 68.90573339 -32 67 C-33.25335497 63.16204284 -33.24015991 59.43158045 -33.23828125 55.41796875 C-33.25779343 54.28982254 -33.2773056 53.16167633 -33.29740906 51.99934387 C-33.32473425 49.61486262 -33.3309703 47.23005947 -33.31762695 44.84545898 C-33.31252579 41.20589715 -33.4190603 37.58089139 -33.53320312 33.94335938 C-33.74720072 17.62664339 -33.74720072 17.62664339 -30.77703857 13.16146851 C-27.38753573 9.95199724 -23.33732292 8.50210456 -19 7 C-17.58891591 6.18756673 -16.19697554 5.33912495 -14.84375 4.43359375 C-13.7403125 3.77488281 -12.636875 3.11617188 -11.5 2.4375 C-9.81390625 1.41462891 -9.81390625 1.41462891 -8.09375 0.37109375 C-4.53264236 -1.20712441 -3.64384292 -1.05260606 0 0 Z "
              fill="#18ADDD"
              transform="translate(84,124)"
            />
            <path
              d="M0 0 C2.13378906 0.96459961 2.13378906 0.96459961 4.265625 2.15234375 C5.06540771 2.59449219 5.86519043 3.03664063 6.68920898 3.4921875 C7.95680054 4.20761719 7.95680054 4.20761719 9.25 4.9375 C10.12664307 5.42605469 11.00328613 5.91460937 11.90649414 6.41796875 C20.34896552 11.14520446 28.6982665 16.0303766 37 21 C37.87922119 21.38381836 38.75844238 21.76763672 39.66430664 22.16308594 C42 24 42 24 42.7421875 27.35058594 C42.81569359 28.72726563 42.85801647 30.10583893 42.875 31.484375 C42.89401367 32.21819397 42.91302734 32.95201294 42.93261719 33.70806885 C42.96229632 35.26123565 42.97823173 36.81471705 42.98144531 38.36816406 C42.99986459 40.7326182 43.10326639 43.08346274 43.2109375 45.4453125 C43.45181189 56.42379471 43.45181189 56.42379471 39.66064453 60.53979492 C36.83320631 62.3539687 34.09569266 63.70692586 31 65 C29.28313984 65.92179185 27.57337449 66.85707699 25.875 67.8125 C24.97523438 68.29332031 24.07546875 68.77414063 23.1484375 69.26953125 C19.2156706 71.43108923 15.35990628 73.71156653 11.5 76 C5.82230179 79.36301161 0.1225862 82.65048751 -5.70703125 85.74609375 C-7.80823816 86.89513535 -9.7966037 88.14750128 -11.8125 89.4375 C-15.66204438 91.32453156 -16.91217576 91.05832014 -21 90 C-24.0078125 88.3984375 -24.0078125 88.3984375 -27.125 86.375 C-28.25549898 85.64946326 -29.38703648 84.92554253 -30.51953125 84.203125 C-31.0913916 83.83638672 -31.66325195 83.46964844 -32.25244141 83.09179688 C-36.02760302 80.73324383 -39.94293645 78.60871582 -43.83203125 76.4453125 C-44.54746094 75.96835938 -45.26289062 75.49140625 -46 75 C-46 74.34 -46 73.68 -46 73 C-45.20980469 72.61070313 -44.41960937 72.22140625 -43.60546875 71.8203125 C-29.27860323 64.7141872 -15.16856709 57.2117274 -1.125 49.5625 C-0.19171875 49.05436768 0.7415625 48.54623535 1.703125 48.02270508 C5.84989375 45.75589097 9.97700081 43.48281331 14 41 C11.44696285 39.4609776 8.88460065 37.94404807 6.3125 36.4375 C5.59126953 35.99986328 4.87003906 35.56222656 4.12695312 35.11132812 C3.06831055 34.49741211 3.06831055 34.49741211 1.98828125 33.87109375 C1.34415283 33.48880615 0.70002441 33.10651855 0.03637695 32.71264648 C-2.69705426 31.75606026 -4.24937796 32.16395602 -7 33 C-9.17012559 34.03330804 -9.17012559 34.03330804 -11.265625 35.37109375 C-12.06468262 35.85803711 -12.86374023 36.34498047 -13.68701172 36.84667969 C-14.53279785 37.37165039 -15.37858398 37.89662109 -16.25 38.4375 C-18.04908953 39.53579476 -19.84857532 40.63344065 -21.6484375 41.73046875 C-22.54788086 42.28138184 -23.44732422 42.83229492 -24.37402344 43.39990234 C-28.18504607 45.72208925 -32.02591564 47.99162686 -35.875 50.25 C-36.56561523 50.65629639 -37.25623047 51.06259277 -37.96777344 51.48120117 C-42.4545448 54.11411534 -46.97129301 56.69010886 -51.5 59.25 C-56.07916717 61.85025684 -60.46200998 64.60164797 -64.8046875 67.57421875 C-68.11789738 69.72603655 -71.59006641 71.55227021 -75.07421875 73.41015625 C-79.33473943 75.72528564 -83.4952739 78.20413437 -87.6640625 80.6796875 C-90 82 -90 82 -91 82 C-91 71.11 -91 60.22 -91 49 C-86.38 46.36 -81.76 43.72 -77 41 C-72.99692545 38.67168113 -68.99642817 36.3396308 -65 34 C-58.68138797 30.30700111 -52.36208697 26.61765729 -46 23 C-39.55813572 19.33480136 -33.15277764 15.60801339 -26.75 11.875 C-25.74324219 11.28847656 -24.73648438 10.70195313 -23.69921875 10.09765625 C-22.72082031 9.52660156 -21.74242188 8.95554687 -20.734375 8.3671875 C-19.77595703 7.8112793 -18.81753906 7.25537109 -17.83007812 6.68261719 C-15.93740742 5.55733367 -14.06579645 4.39588171 -12.21679688 3.20019531 C-10.9106543 2.36246582 -10.9106543 2.36246582 -9.578125 1.5078125 C-8.8140332 1.00137207 -8.04994141 0.49493164 -7.26269531 -0.02685547 C-4.35666226 -1.27668799 -2.9841219 -0.95192314 0 0 Z "
              fill="#18ADDD"
              transform="translate(143,40)"
            />
            <path
              d="M0 0 C5.8925095 2.94625475 11.68343828 5.84489723 17.375 9.125 C17.96410156 9.45886719 18.55320313 9.79273437 19.16015625 10.13671875 C20.78651922 11.06867955 22.39409162 12.03321888 24 13 C25.06846916 13.50250778 25.06846916 13.50250778 26.15852356 14.01516724 C29.24464123 17.34153478 28.5809979 21.25465603 28.56518555 25.62451172 C28.58292778 27.10541794 28.58292778 27.10541794 28.60102844 28.61624146 C28.63399026 31.88761471 28.63687219 35.15815896 28.63671875 38.4296875 C28.64702856 40.70029036 28.65809101 42.97088991 28.6698761 45.2414856 C28.68933162 50.00466482 28.69272188 54.7675503 28.6862793 59.53076172 C28.68028313 65.63689674 28.72450421 71.74151162 28.78216839 77.84733391 C28.81912718 82.5382576 28.82407298 87.22881358 28.81989479 91.91986465 C28.82277048 94.17097292 28.83687534 96.42209566 28.86237144 98.67306137 C28.89428745 101.82198941 28.88182387 104.96776522 28.8581543 108.11669922 C28.87703705 109.04778503 28.8959198 109.97887085 28.91537476 110.93817139 C28.80476211 117.1195345 28.80476211 117.1195345 26.47684669 119.66643524 C24.70139179 120.95749369 22.95473884 122.00625606 21 123 C20.13117188 123.49854492 19.26234375 123.99708984 18.3671875 124.51074219 C17.54476562 124.93516602 16.72234375 125.35958984 15.875 125.796875 C11.65409666 128.04283381 7.63532619 130.47480335 3.625 133.078125 C2.53703125 133.76261719 1.4490625 134.44710937 0.328125 135.15234375 C-1.34772821 136.20860334 -3.02363812 137.26594118 -4.66601562 138.37353516 C-8.31571852 140.82132355 -11.74956894 142.82885348 -16 144 C-20.34153141 143.06137768 -23.40575157 140.52280121 -27 138 C-30.19461657 136.14480755 -33.44206303 134.3893643 -36.6875 132.625 C-38.27574477 131.74399719 -39.86306474 130.86132397 -41.44921875 129.9765625 C-42.13330811 129.59580566 -42.81739746 129.21504883 -43.5222168 128.82275391 C-44.00988525 128.55124512 -44.49755371 128.27973633 -45 128 C-45.3486932 119.15995537 -45.61460039 110.32229865 -45.77718258 101.476861 C-45.85525219 97.36840402 -45.96092946 93.26467159 -46.1315918 89.15893555 C-46.29550808 85.1903113 -46.38442588 81.22620265 -46.42315865 77.25445366 C-46.45072305 75.745608 -46.50457246 74.23699084 -46.58595085 72.73008919 C-46.83815311 67.86304962 -46.75533137 63.6309231 -45 59 C-41.36485233 55.22195625 -36.6502666 53.05273665 -31.9335041 50.91488457 C-28.88052304 49.4702922 -26.06381247 47.70570409 -23.1875 45.9375 C-18.25170068 43 -18.25170068 43 -16 43 C-15.97480203 47.67325471 -15.95691151 52.34646772 -15.94506836 57.01977539 C-15.94011804 58.60116263 -15.93335608 60.18254549 -15.92456055 61.76391602 C-15.8748339 70.95164466 -16.03958467 80.07069372 -16.64071655 89.24020386 C-16.96537164 94.19714537 -17.10724153 99.09619064 -17.0625 104.0625 C-17.05798828 104.74892578 -17.05347656 105.43535156 -17.04882812 106.14257812 C-17.03750517 107.76176096 -17.01961229 109.38089635 -17 111 C-15.41499412 110.0653305 -13.83206584 109.12713737 -12.25 108.1875 C-11.36828125 107.66542969 -10.4865625 107.14335937 -9.578125 106.60546875 C-7.00979966 105.07392528 -7.00979966 105.07392528 -4.859375 103.30078125 C-3 102 -3 102 0 102 C0 68.34 0 34.68 0 0 Z "
              fill="#18AEDE"
              transform="translate(200,73)"
            />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default AnimatedIcons;
