import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  CheckBox,
  TextInput,
  Platform,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Button } from "../../../../src/components/Button/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "./styles";
import bckImage from "../../../../assets/blueBck.jpg";
import { addTransaction } from "../../../store/actions/transactionActions";
import { useDispatch } from "react-redux";
import { SimpleLineIcons } from "@expo/vector-icons";
import moment from "moment";

export function IncomesInsert() {
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [price, setPrice] = useState<number>();
  const [title, setTitle] = useState<string>();
  const [addedTime, setAddedTime] = useState(new Date());
  const [mode, setMode] = useState<any>("date");
  const [show, setShow] = useState<boolean>(false);
  const navigation = useNavigation();
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || addedTime;
    setAddedTime(currentDate);
    console.log("ADDED TIME: ", addedTime);
    console.log("CURRENT: ", currentDate);
    setShow(Platform.OS === "ios");
  };
  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode("date");
  };
  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!price);
  }
  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleSubmit() {
    navigation.navigate("Overview");
    const transaction = { price, title, addedTime };
    if (!price || !title || !addedTime) return alert("Insira os detalhes");
    dispatch(addTransaction(transaction));
    setPrice("");
    setTitle("");
  }
  return (
    <ImageBackground source={bckImage} style={styles.bckImage}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.content}>
              <View style={styles.form}>
                <Text style={styles.title}>Inserir novo rendimento</Text>
                <Text style={styles.subTitle}>Título:</Text>
                <TextInput
                  style={[
                    styles.input,
                    (isFocused || isFilled) && { borderColor: "#FFC062" }, //&& seria o então
                  ]}
                  placeholder="Nome do rendimento "
                  onBlur={handleInputBlur}
                  onFocus={handleInputFocus}
                  defaultValue={title}
                  onChangeText={(title) => setTitle(title)}
                />
                <Text style={styles.subTitle}>Valor do rendimento :</Text>
                <TextInput
                  style={[
                    styles.input,
                    (isFocused || isFilled) && { borderColor: "#FFC062" }, //&& seria o então
                  ]}
                  placeholder="R$ 00.00"
                  onBlur={handleInputBlur}
                  onFocus={handleInputFocus}
                  keyboardType="number-pad"
                  defaultValue={price}
                  onChangeText={(price) => setPrice(price)}
                />
                <Text style={styles.subTitle}>Data:</Text>
                <TouchableOpacity
                  style={styles.dataBarView}
                  onPress={showDatepicker}
                >
                  <Text style={styles.input}>
                    {addedTime !== new Date()
                      ? moment(addedTime).format("D/MM/Y")
                      : "01/01/2021"}
                  </Text>
                  <SimpleLineIcons
                    name="calendar"
                    style={{ marginLeft: -60, paddingTop: 12 }}
                    size={35}
                    color="#443C8A"
                    onPress={showDatepicker}
                  />
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={addedTime}
                    mode={mode}
                    display="default"
                    onChange={onChange}
                  />
                )}

                <Text style={styles.subTitle}>Repetir:</Text>
                <View style={styles.rowConfig}>
                  <CheckBox
                    style={styles.checkBox}
                    value={isSelected}
                    onValueChange={setSelection}
                  />
                  <Text style={styles.subTitle}>
                    {isSelected
                      ? "É uma receita fixa"
                      : "Não é uma receita fixa"}
                  </Text>
                </View>
                <Button title={"Confirmar"} onPress={handleSubmit} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}
