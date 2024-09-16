import {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,

} from 'react-native';
import * as Yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Formik } from 'formik';

// Form validation

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 characters')
    .max(16, 'Should be max of 16 characters')
    .required('Length is required'),
});
export default function App() {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [numbers, setNumbers] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitsChars = '1234567890';
    const specialChars = '@$#*^&%-_!';
    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (numbers) {
      characterList += digitsChars;
    }
    if (symbol) {
      characterList += specialChars;
    }

    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPassGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPassword = () => {
    setPassword('');
    setLowerCase(true);
    setNumbers(false);
    setSymbol(false);
    setUpperCase(false);
  };
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>PassWord Generator</Text>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={PasswordSchema}
            onSubmit={(values) => {
                 console.log(values)
                 generatePasswordString(Number(values.passwordLength))    
              }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
         
            }) => (
              <>  
               <View style={styles.inputWrapper}>
                     <View style={styles.inputColumn}>
                          <Text style={styles.heading}>Enter Password Length</Text>
                          {touched.passwordLength && errors.passwordLength &&
                           (
                              <Text style={styles.errorText}>
                                 (errors.passwordLength)
                              </Text>
                           )}
                          <TextInput 
                            value={values.passwordLength}
                            onChangeText={handleChange('passwordLength')}
                            placeholder='Ex : 8'
                            keyboardType='numeric'
                           />
                     </View> 
               </View>
               <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include lowerCase</Text>
                  <BouncyCheckbox 
                   useBuiltInState={false}
                    isChecked={lowerCase}
                    onPress ={()=>setLowerCase(!lowerCase)}
                    fillColor='#29ABB7'
                  />
               </View>
               <View style={styles.inputWrapper}>
                 <Text style={styles.heading}>Include lowerCase</Text>
                   <BouncyCheckbox 
                    useBuiltInState={false}
                    isChecked={upperCase}
                    onPress ={()=>setUpperCase(!upperCase)}
                    fillColor='#f05f2f'
                  />
               </View>
               <View style={styles.inputWrapper}>
                 <Text style={styles.heading}>Include lowerCase</Text>
                   <BouncyCheckbox 
                    isChecked={numbers}
                    onPress ={()=>setNumbers(!numbers)}
                    fillColor='#15803d'
                   />
               </View>
               <View style={styles.inputWrapper}>
                 <Text style={styles.heading}>Include lowerCase</Text>
                   <BouncyCheckbox 
                    isChecked={symbol}
                    onPress ={()=>setSymbol(!symbol)}
                    fillColor='#94d94c'
                   />
               </View>
               
               <View style={styles.formActions}>
                      <TouchableOpacity
                        disabled={!isValid}
                        style={styles.primaryBtn}
                        onPress={handleSubmit}
                      >
                        <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                     </TouchableOpacity>

                     <TouchableOpacity
                           style={styles.secondaryBtn}
                           onPress={()=>{
                              handleReset();
                              resetPassword();
                           }}
                     >
                          <Text style={styles.secondaryBtnTxt}>Reset</Text>
                     </TouchableOpacity>
                </View> 
             </>  
            )}
          </Formik>
        </View>
        {isPassGenerated ?(
             <View style={[styles.card ,styles.cardElevated]}>
                  <Text style={styles.subTitle}>Result:</Text>
                  <Text style={styles.description}>Long press to copy</Text>
                  <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
             </View>
        ):null}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    appContainer: {
      flex: 1,
    },
    formContainer: {
      margin: 8,
      padding: 8,
    },
    title: {
      fontSize: 32,
      fontWeight: '600',
      marginBottom: 15,
    },
    subTitle: {
      fontSize: 26,
      fontWeight: '600',
      marginBottom: 2,
    },
    description: {
      color: '#758283',
      marginBottom: 8,
    },
    heading: {
      fontSize: 15,
    },
   
    inputWrapper: {
      flex:1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width:'70%',
      marginBottom: 15,
    },
    inputColumn: {
      flexDirection: 'column',
    },
    inputStyle: {
      padding: 8,
      width: '30%',
      borderWidth: 1,
      borderRadius: 4,
      borderColor: '#16213e',
    },
    errorText: {
      fontSize: 12,
      color: '#ff0d10',
    },
    formActions: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    primaryBtn: {
      width: 120,
      padding: 10,
      borderRadius: 8,
      marginHorizontal: 8,
      backgroundColor: '#5DA3FA',
    },
    primaryBtnTxt: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700',
    },
    secondaryBtn: {
      width: 120,
      padding: 10,
      borderRadius: 8,
      marginHorizontal: 8,
      backgroundColor: '#CAD5E2',
    },
    secondaryBtnTxt: {
      textAlign: 'center',
    },
    card: {
      padding: 12,
      borderRadius: 6,
      marginHorizontal: 12,
    },
    cardElevated: {
      backgroundColor: '#ffffff',
      elevation: 1,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowColor: '#333',
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    generatedPassword: {
      fontSize: 22,
      textAlign: 'center',
      marginBottom: 12,
      color:'#000'
    },
  });
