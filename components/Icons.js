import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

export const NotificationIcon = (props) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <G clipPath="url(#prefix__clip0)" fill="white">
        <Path d="M20 10V8A8 8 0 004 8v2a4.441 4.441 0 01-1.547 3.193A4.183 4.183 0 001 16c0 2.5 4.112 4 11 4s11-1.5 11-4a4.183 4.183 0 00-1.453-2.807A4.44 4.44 0 0120 10zM9.145 21.9a2.992 2.992 0 005.71 0c-.894.066-1.844.1-2.855.1s-1.961-.032-2.855-.1z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}


export const PodcastsIcon = (props) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <Path
        fill="#4CC8FE"
        d="M4.516 21C1.565 20.39 0 17.91 0 15.5c0-2.615 1.731-5.198 5.283-5.5A9.032 9.032 0 003 16c0 1.782.618 3.6 1.516 5zM24 15.5c0 2.409-1.55 4.889-4.5 5.5.897-1.4 1.5-3.218 1.5-5a9.032 9.032 0 00-2.283-6c3.552.303 5.283 2.886 5.283 5.5zm-5.074-7.487a8.631 8.631 0 012.529.601C20.185 4.226 16.789 1 12 1 7.214 1 3.827 4.225 2.558 8.607a8.674 8.674 0 012.52-.595C6.425 5.474 8.92 3.972 12 3.978c3.081-.006 5.578 1.496 6.926 4.035zm-6.259 5.754c-.021-.039.199-.06.239-.06.043.005-.114.263-.239.06zm-1.255-1.793l.063-.018-.03.079c.05.091.012.145.004.194l-.087.054c-.031.039.15.043.152.049.006.02-.219.052-.177.1.056.079.48-.114.413-.103.131-.066.017-.073-.056-.111-.025-.125-.046-.319-.124-.396l.051-.06c-.12-.174-.209.212-.209.212zM19 16a7 7 0 11-14 0 7 7 0 0114 0zm-4.847-3.133c-.003-.085-.111-.166-.223-.018-.079.102-.065.256-.107.325-.061.102.331.198.331.102.015-.162.427-.037.508-.015.145.041.375-.131.123-.222-.208-.075-.317-.156-.335-.304l.062-.097c-.129.014-.359.457-.359.229zM17.825 16c0-.604-.103-1.213-.208-1.535a.355.355 0 00-.209-.221c-.149-.058-.78.348-.875.148l-.334.004c-.07-.039-.265-.3-.353-.268-.18.064.276.562.401.627.118-.089.497-.271.579-.022.156.469-.43.982-.73 1.254-.448.405-.364-.262-.669-.497-.161-.123-.159-.385-.32-.476-.073-.041-.405-.423-.401-.475l-.01.097c-.055.042-.171-.156-.184-.187 0 .172.28.446.372.583.158.237.243.581.437.774.104.104.501.533.604.524l.531-.252c.375.089-.884 1.87-1.003 2.09-.099.185.08.642.066.861-.017.252-.216.334-.404.472-.202.147-.155.435-.324.54-.301.186-.519.789-.947.786-.126-.001-.665.21-.735.004-.055-.149-.128-.263-.206-.41L12.8 20c-.064-.089-.277-.29-.296-.395-.001-.091.068-.365.164-.413.134-.068.026-.267.009-.383a.774.774 0 00-.31-.496c-.227-.174-.11-.313-.056-.563 0-.119-.072-.275-.232-.229-.329.096-.229-.257-.469-.241-.173.013-.314.122-.475.17-.202.06-.409-.048-.608-.073-.821-.104-1.088-1.042-.875-1.718l-.028-.402c.092-.205.28-.436.444-.591.092-.088.211-.065.319-.133.167-.105.17-.322.334-.456.233-.189.552-.186.856-.226.162-.021.779-.155.876-.035 0 .022.112.353-.011.334.252.014.612.437.852.338.123-.051.078-.43.331-.247.153.11.837.159.98.041.087-.072.137-.542.03-.595.068.067-.356.072-.396.057-.07-.026-.136.066-.248.015.068.032-.376-.207-.127-.389l-.314.063-.075.16c-.176.09-.309-.306-.375-.351-.067-.044-.591-.412-.449-.172l.46.458c-.023.015-.121-.167-.121-.034.031-.079.012.337-.061.202l.003-.156-.159-.132c-.073-.09-.267-.29-.372-.337-.029-.014-.445.05-.48.064l-.104.182-.244.125-.092.206c-.04.035-.446.17-.448.175.017-.044-.284-.1-.265-.188.022-.096.125-.396.098-.506-.028-.115.626.166.669-.137.017-.131.027-.284-.183-.307.04.005.406-.144.466-.21.086-.098.281-.258.422-.258.166 0 .13-.241.206-.359.077.031-.041.22.051.296-.005-.06.26.033.286.02.061-.033.399-.014.347-.173-.058-.162.03-.114.105-.147-.013.005.198-.361.235-.241-.025-.124-.246.043-.323.037-.178-.014-.103-.303-.035-.388.052-.067-.142-.149-.144-.021-.003.192-.182.366-.141.621.063.385-.429-.093-.472-.066-.164.099-.297-.125-.212-.259l.38-.277c.06-.104.131-.225.224-.303.312-.262.398-.052.709-.024.304.028.103.072.061.189-.041.111.167.15.239.058.041-.053.134-.188.173-.288.052-.129.526-.115.195-.312-.218-.13-1.169-.392-1.806-.392-.138 0-.234.153-.339.24-.208.172-.739.51-1.036.407-.303-.104-.951.385-1.055.389-.039.001.001-.37.208-.397-.089.013.728-.413.706-.501-.027-.105-1.633.479-1.561.597.034.053.174.053-.009.171-.105.063-.217.467-.316.467-.294.129-.313-.253-.641.239l-.521.21a5.798 5.798 0 00-1.504 3.023c-.008.046.194.132.221.164.065.078.065.416.098.526.08.279.279.434.432.688.09.151.239.533.192.692.063-.104.625.476.727.596.241.284.428.628.035.909-.126.091.192.659.028.798l-.21.054c-.208.128-.114.441.012.573a5.81 5.81 0 004.211 1.801A5.838 5.838 0 0017.825 16zm-6.712-3.708c.073-.032.171-.031.181-.128l.047-.058-.064-.086-.087.061-.042.011-.04.051.004.028-.051.062c-.049.048.002.08.052.059z"
      />
    </Svg>
  )
}


export const ResourcesIcon = (props) => {
  return (
    <Svg
      width={24} height={24}
      aria-hidden="true"
      data-prefix="fad"
      data-icon="user-headset"
      viewBox="0 0 448 512"
      {...props}
    >
      <Path
        fill="#EC5AF9"
        d="M416 192v16a112.15 112.15 0 01-112 112h-96a32 32 0 010-64h32a32 32 0 0132 32h32a80.09 80.09 0 0080-80v-16c0-88.22-71.78-160-160-160S64 103.78 64 192v16a16 16 0 01-32 0v-16C32 86.13 118.13 0 224 0s192 86.13 192 192z"
      />
      <Path
        fill="#EFF2FA"
        d="M320 352h-23.1a174.1 174.1 0 01-145.8 0H128A128 128 0 000 480a32 32 0 0032 32h384a32 32 0 0032-32 128 128 0 00-128-128zm-175.65-60.53c-.06-1.17-.35-2.28-.35-3.47a64.07 64.07 0 0164-64h32a64 64 0 0155.41 32H304a48.05 48.05 0 0048-48v-16a128 128 0 00-256 0c0 40.42 19.1 76 48.35 99.47z"
      />
    </Svg>
  )
}


export const JobSearchIcon = (props) =>  {
  return (
    <Svg
      width={24} height={24}
      aria-hidden="true"
      data-prefix="fas"
      data-icon="search-dollar"
      viewBox="0 0 512 512"
      {...props}
    >
      <Path
        fill="#13BF5D"
        d="M505.04 442.66l-99.71-99.69c-4.5-4.5-10.6-7-17-7h-16.3c27.6-35.3 44-79.69 44-127.99C416.03 93.09 322.92 0 208.02 0S0 93.09 0 207.98s93.11 207.98 208.02 207.98c48.3 0 92.71-16.4 128.01-44v16.3c0 6.4 2.5 12.5 7 17l99.71 99.69c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.59.1-33.99zm-297.02-90.7c-79.54 0-144-64.34-144-143.98 0-79.53 64.35-143.98 144-143.98 79.54 0 144 64.34 144 143.98 0 79.53-64.35 143.98-144 143.98zm27.11-152.54l-45.01-13.5c-5.16-1.55-8.77-6.78-8.77-12.73 0-7.27 5.3-13.19 11.8-13.19h28.11c4.56 0 8.96 1.29 12.82 3.72 3.24 2.03 7.36 1.91 10.13-.73l11.75-11.21c3.53-3.37 3.33-9.21-.57-12.14-9.1-6.83-20.08-10.77-31.37-11.35V112c0-4.42-3.58-8-8-8h-16c-4.42 0-8 3.58-8 8v16.12c-23.63.63-42.68 20.55-42.68 45.07 0 19.97 12.99 37.81 31.58 43.39l45.01 13.5c5.16 1.55 8.77 6.78 8.77 12.73 0 7.27-5.3 13.19-11.8 13.19h-28.1c-4.56 0-8.96-1.29-12.82-3.72-3.24-2.03-7.36-1.91-10.13.73l-11.75 11.21c-3.53 3.37-3.33 9.21.57 12.14 9.1 6.83 20.08 10.77 31.37 11.35V304c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8v-16.12c23.63-.63 42.68-20.54 42.68-45.07 0-19.97-12.99-37.81-31.59-43.39z"
      />
    </Svg>
  )
}


export const HtmlCssIcon = (props) =>  {
  return (
    <Svg
      width={24} height={24}
      aria-hidden="true"
      data-prefix="fab"
      data-icon="html5"
      viewBox="0 0 384 512"
      {...props}
    >
      <Path
        fill="tomato"
        d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z"
      />
    </Svg>
  )
}
