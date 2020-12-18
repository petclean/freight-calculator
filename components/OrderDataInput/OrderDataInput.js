import React, { useRef } from "react";
import { View, TouchableWithoutFeedback, Text, TextInput } from "react-native";
import tw from "tailwind-rn";

const OrderDataInput = ({
  label,
  value,
  onChangeText,
  containerStyle,
  labelStyle,
  inputStyle,
}) => {
  const textInputRef = useRef();

  return (
    <TouchableWithoutFeedback onPress={() => textInputRef.current?.focus()}>
      <View style={[tw("flex-row items-center"), containerStyle]}>
        <Text style={[tw("flex-1 text-base"), labelStyle]}>{label}</Text>
        <TextInput
          ref={textInputRef}
          style={[
            tw("text-2xl w-24 h-12 border border-gray-600 rounded px-5"),
            inputStyle,
          ]}
          keyboardType="number-pad"
          textAlign="center"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OrderDataInput;
