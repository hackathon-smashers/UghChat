"use client"

import '../../components/smokeeffect/SmokeEffect'
import SmokeEffect from '../../components/smokeeffect/SmokeEffect'
// import SmokeElement from "smoke-effect-react";

// className="flex w-full h-screen min-h-screen bg-gray-30"


export default function Page() {
    return (
        <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
             {/* <SmokeElement
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/quickText.png"
                opacity="1"
                smokeSrc="https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png"
                smokeOpacity="0.3"
                /> */}
                <SmokeEffect />
        </div>
    )
}