import React from "react";
import { View } from "react-native";

export const AdSenseDisplay = ({
  client,
  slot,
  format = "auto",
  responsive = true,
}) => {
  return (
    <View style={{ width: "100%", alignItems: "center", marginVertical: 10 }}>
      <div
        dangerouslySetInnerHTML={{
          __html: `
            <ins class="adsbygoogle"
              style="display:block"
              data-ad-client="${client}"
              data-ad-slot="${slot}"
              data-ad-format="${format}"
              ${responsive ? 'data-full-width-responsive="true"' : ""}></ins>
            <script>
              (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
          `,
        }}
      />
    </View>
  );
};
