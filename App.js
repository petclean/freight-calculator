import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import tw from "tailwind-rn";
import {
  loadCldr,
  GlobalizeProvider,
  useGlobalize,
} from "react-native-globalize";
import { OrderDataInput } from "./components";
import { calcFreightPrice } from "./utils";

loadCldr(require("react-native-globalize/locale-data/eu"));

const App = () => {
  const [refils, setRefils] = useState("");
  const [dispensers, setDispensers] = useState("");
  const [isValid, setIsValid] = useState(false);

  const { formatCurrency } = useGlobalize();

  const validate = useCallback(() => {
    let newValid = true;
    if (!refils) {
      if (!dispensers || dispensers === "0") {
        newValid = false;
      }
    } else if (!dispensers) {
      if (!refils || refils === "0") {
        newValid = false;
      }
    } else if (refils === "0" && dispensers === "0") {
      newValid = false;
    }

    setIsValid(newValid);
  }, [refils, dispensers]);

  const calculateHandler = useCallback(() => {
    let freightPrice = calcFreightPrice({ refils, dispensers });
    if (!freightPrice) return;

    freightPrice = formatCurrency(calcFreightPrice({ refils, dispensers }))
      .replace(/US\$/, "")
      .trim();

    Alert.alert(`R$ ${freightPrice}`);
  }, [refils, dispensers, formatCurrency]);

  useEffect(() => {
    validate();
  }, [validate]);

  return (
    <>
      <StatusBar style="light" />
      <TouchableWithoutFeedback style={tw("flex-1")} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={tw("flex-1 items-center justify-center p-10 bg-gray-800")}
          behavior="padding"
        >
          <View style={tw("min-w-full bg-white p-5 rounded-lg")}>
            <OrderDataInput
              label="# Refils:"
              value={refils}
              onChangeText={setRefils}
              containerStyle={tw("mb-4")}
            />
            <OrderDataInput
              label="# Dispensers:"
              value={dispensers}
              onChangeText={setDispensers}
            />
          </View>
          {isValid && (
            <View style={tw("mt-4 bg-white rounded")}>
              <TouchableOpacity
                style={tw("min-w-full rounded bg-green-400 py-5")}
                onPress={calculateHandler}
                disabled={!isValid}
              >
                <Text
                  style={tw("text-center text-green-900 text-lg font-black")}
                >
                  Calculate
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default () => (
  <GlobalizeProvider locale="eu">
    <App />
  </GlobalizeProvider>
);
