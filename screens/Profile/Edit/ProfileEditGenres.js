import { StyleSheet, View, KeyboardAvoidingView, Pressable, Text, Image, TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { useAuth } from '../../../contexts/AuthContext';
import { editGenres } from '../../../api/profile';
import ProfileEditHeader from './ProfileEditHeader';

const ProfileEditGenres = () => {
    const navigation = useNavigation();
    const { user } = useAuth()
    const [selected, setSelected] = useState([]);

    const data = [{ "key": 0, "value": "2-step" }, { "key": 1, "value": "4-beat" }, { "key": 2, "value": "Acid breaks" }, { "key": 3, "value": "Acid house" }, { "key": 4, "value": "Acid jazz" }, { "key": 5, "value": "Acid rock" }, { "key": 6, "value": "Acid techno" }, { "key": 7, "value": "Acid trance" }, { "key": 8, "value": "Aggrotech" }, { "key": 9, "value": "Alternative dance" }, { "key": 10, "value": "Alternative metal" }, { "key": 11, "value": "Alternative rock" }, { "key": 12, "value": "Ambient dub" }, { "key": 13, "value": "Ambient house" }, { "key": 14, "value": "Ambient techno" }, { "key": 15, "value": "Ambient" }, { "key": 16, "value": "Anarcho punk" }, { "key": 17, "value": "Anti-folk" }, { "key": 18, "value": "Art punk" }, { "key": 19, "value": "Art rock" }, { "key": 20, "value": "Asian Underground" }, { "key": 21, "value": "Avant-garde jazz" }, { "key": 22, "value": "Baggy" }, { "key": 23, "value": "Balearic Beat" }, { "key": 24, "value": "Baltimore Club" }, { "key": 25, "value": "Bassline" }, { "key": 26, "value": "Beat music" }, { "key": 27, "value": "Bebop" }, { "key": 28, "value": "Big beat" }, { "key": 29, "value": "Bitpop" }, { "key": 30, "value": "Black metal" }, { "key": 31, "value": "Boogie-woogie" }, { "key": 32, "value": "Boogie" }, { "key": 33, "value": "Bossa nova" }, { "key": 34, "value": "Bouncy house" }, { "key": 35, "value": "Bouncy techno" }, { "key": 36, "value": "Breakbeat hardcore" }, { "key": 37, "value": "Breakbeat" }, { "key": 38, "value": "Breakcore" }, { "key": 39, "value": "Breakstep" }, { "key": 40, "value": "British dance" }, { "key": 41, "value": "Britpop" }, { "key": 42, "value": "Broken beat" }, { "key": 43, "value": "Bubblegum dance" }, { "key": 44, "value": "Canterbury scene" }, { "key": 45, "value": "Cape jazz" }, { "key": 46, "value": "Celtic metal" }, { "key": 47, "value": "Celtic punk" }, { "key": 48, "value": "Celtic" }, { "key": 49, "value": "Chamber jazz" }, { "key": 50, "value": "Chicago house" }, { "key": 51, "value": "Chill out" }, { "key": 52, "value": "Chillwave" }, { "key": 53, "value": "Chinese rock" }, { "key": 54, "value": "Chiptune" }, { "key": 55, "value": "Christian metal" }, { "key": 56, "value": "Christian punk" }, { "key": 57, "value": "Christian rock" }, { "key": 58, "value": "Classic trance" }, { "key": 59, "value": "Coldwave" }, { "key": 60, "value": "Contemporary folk" }, { "key": 61, "value": "Continental Jazz" }, { "key": 62, "value": "Cool jazz" }, { "key": 63, "value": "Cosmic disco" }, { "key": 64, "value": "Cowpunk" }, { "key": 65, "value": "Crossover jazz" }, { "key": 66, "value": "Crossover thrash" }, { "key": 67, "value": "Crunk" }, { "key": 68, "value": "Crust punk" }, { "key": 69, "value": "Crustgrind" }, { "key": 70, "value": "Cybergrind" }, { "key": 71, "value": "D-beat" }, { "key": 72, "value": "Dance-pop" }, { "key": 73, "value": "Dance-punk" }, { "key": 74, "value": "Dance-rock" }, { "key": 75, "value": "Dark ambient" }, { "key": 76, "value": "Dark cabaret" }, { "key": 77, "value": "Dark electro" }, { "key": 78, "value": "Dark psytrance" }, { "key": 79, "value": "Dark Wave" }, { "key": 80, "value": "Darkcore" }, { "key": 81, "value": "Darkside jungle" }, { "key": 82, "value": "Darkstep" }, { "key": 83, "value": "Death industrial" }, { "key": 84, "value": "Death metal" }, { "key": 85, "value": "Deathcore" }, { "key": 86, "value": "Deathrock" }, { "key": 87, "value": "Deep house" }, { "key": 88, "value": "Desert rock" }, { "key": 89, "value": "Detroit techno" }, { "key": 90, "value": "Digital hardcore" }, { "key": 91, "value": "Disco house" }, { "key": 92, "value": "Disco polo" }, { "key": 93, "value": "Disco" }, { "key": 94, "value": "Diva house" }, { "key": 95, "value": "Dixieland" }, { "key": 96, "value": "Djent" }, { "key": 97, "value": "Doom metal" }, { "key": 98, "value": "Doomcore" }, { "key": 99, "value": "Downtempo" }, { "key": 100, "value": "Dream house" }, { "key": 101, "value": "Dream pop" }, { "key": 102, "value": "Dream trance" }, { "key": 103, "value": "Drone metal" }, { "key": 104, "value": "Drone" }, { "key": 105, "value": "Drum and bass" }, { "key": 106, "value": "Drumfunk" }, { "key": 107, "value": "Drumstep" }, { "key": 108, "value": "Dub" }, { "key": 109, "value": "Dubstep" }, { "key": 110, "value": "Dubstyle" }, { "key": 111, "value": "Dubtronica" }, { "key": 112, "value": "Dunedin Sound" }, { "key": 113, "value": "Dutch house" }, { "key": 114, "value": "EDM" }, { "key": 115, "value": "Electro backbeat" }, { "key": 116, "value": "Electro house" }, { "key": 117, "value": "Electro-grime" }, { "key": 118, "value": "Electro-industrial" }, { "key": 119, "value": "Electro" }, { "key": 120, "value": "Electroacoustic" }, { "key": 121, "value": "Electroclash" }, { "key": 122, "value": "Electronic art music" }, { "key": 123, "value": "Electronic rock" }, { "key": 124, "value": "Electronica" }, { "key": 125, "value": "Electronicore" }, { "key": 126, "value": "Electropop" }, { "key": 127, "value": "Electropunk" }, { "key": 128, "value": "Emo" }, { "key": 129, "value": "Epic doom" }, { "key": 130, "value": "Ethereal wave" }, { "key": 131, "value": "Ethnic electronica" }, { "key": 132, "value": "Euro disco" }, { "key": 133, "value": "Eurobeat" }, { "key": 134, "value": "Eurodance" }, { "key": 135, "value": "European free jazz" }, { "key": 136, "value": "Europop" }, { "key": 137, "value": "Experimental rock" }, { "key": 138, "value": "Filk" }, { "key": 139, "value": "Florida breaks" }, { "key": 140, "value": "Folk metal" }, { "key": 141, "value": "Folk punk" }, { "key": 142, "value": "Folk rock" }, { "key": 143, "value": "Folk" }, { "key": 144, "value": "Folktronica" }, { "key": 145, "value": "Freak folk" }, { "key": 146, "value": "Freakbeat" }, { "key": 147, "value": "Free tekno" }, { "key": 148, "value": "Freestyle house" }, { "key": 149, "value": "Freestyle" }, { "key": 150, "value": "French house" }, { "key": 151, "value": "Full on" }, { "key": 152, "value": "Funeral doom" }, { "key": 153, "value": "Funk metal" }, { "key": 154, "value": "Funky house" }, { "key": 155, "value": "Funky" }, { "key": 156, "value": "Futurepop" }, { "key": 157, "value": "Gabber" }, { "key": 158, "value": "Garage punk" }, { "key": 159, "value": "Garage rock" }, { "key": 160, "value": "Ghetto house" }, { "key": 161, "value": "Ghettotech" }, { "key": 162, "value": "Glam metal" }, { "key": 163, "value": "Glam rock" }, { "key": 164, "value": "Glitch" }, { "key": 165, "value": "Goregrind" }, { "key": 166, "value": "Gothic metal" }, { "key": 167, "value": "Gothic rock" }, { "key": 168, "value": "Grime" }, { "key": 169, "value": "Grindcore" }, { "key": 170, "value": "Groove metal" }, { "key": 171, "value": "Grunge" }, { "key": 172, "value": "Happy hardcore" }, { "key": 173, "value": "Hard bop" }, { "key": 174, "value": "Hard NRG" }, { "key": 175, "value": "Hard rock" }, { "key": 176, "value": "Hard trance" }, { "key": 177, "value": "Hardbag" }, { "key": 178, "value": "Hardcore punk" }, { "key": 179, "value": "Hardcore/Hard dance" }, { "key": 180, "value": "Hardstep" }, { "key": 181, "value": "Hardstyle" }, { "key": 182, "value": "Heavy metal" }, { "key": 183, "value": "Hi-NRG" }, { "key": 184, "value": "Hip house" }, { "key": 185, "value": "Horror punk" }, { "key": 186, "value": "House" }, { "key": 187, "value": "IDM" }, { "key": 188, "value": "Illbient" }, { "key": 189, "value": "Indie folk" }, { "key": 190, "value": "Indie pop" }, { "key": 191, "value": "Indie rock" }, { "key": 192, "value": "Indietronica" }, { "key": 193, "value": "Industrial folk" }, { "key": 194, "value": "Industrial metal" }, { "key": 195, "value": "Industrial rock" }, { "key": 196, "value": "Industrial" }, { "key": 197, "value": "Intelligent drum and bass" }, { "key": 198, "value": "Italo dance" }, { "key": 199, "value": "Italo disco" }, { "key": 200, "value": "Italo house" }, { "key": 201, "value": "Japanoise" }, { "key": 202, "value": "Jazz blues" }, { "key": 203, "value": "Jazz fusion" }, { "key": 204, "value": "Jazz rap" }, { "key": 205, "value": "Jazz rock" }, { "key": 206, "value": "Jazz-funk" }, { "key": 207, "value": "Jump-Up" }, { "key": 208, "value": "Jumpstyle" }, { "key": 209, "value": "Krautrock" }, { "key": 210, "value": "Laptronica" }, { "key": 211, "value": "Latin house" }, { "key": 212, "value": "Latin jazz" }, { "key": 213, "value": "Liquid funk" }, { "key": 214, "value": "Livetronica" }, { "key": 215, "value": "Lowercase" }, { "key": 216, "value": "Lo-fi" }, { "key": 217, "value": "Madchester" }, { "key": 218, "value": "Mainstream jazz" }, { "key": 219, "value": "Makina" }, { "key": 220, "value": "Math rock" }, { "key": 221, "value": "Mathcore" }, { "key": 222, "value": "Medieval metal" }, { "key": 223, "value": "Melodic death metal" }, { "key": 224, "value": "Metalcore" }, { "key": 225, "value": "Minimal house/Microhouse" }, { "key": 226, "value": "Minimal" }, { "key": 227, "value": "Modal jazz" }, { "key": 228, "value": "Moombahton" }, { "key": 229, "value": "Neo-bop jazz" }, { "key": 230, "value": "Neo-psychedelia" }, { "key": 231, "value": "Neo-swing" }, { "key": 232, "value": "Neofolk" }, { "key": 233, "value": "Neurofunk" }, { "key": 234, "value": "New Beat" }, { "key": 235, "value": "New jack swing" }, { "key": 236, "value": "New prog" }, { "key": 237, "value": "New rave" }, { "key": 238, "value": "New wave" }, { "key": 239, "value": "New-age" }, { "key": 240, "value": "Nintendocore" }, { "key": 241, "value": "No wave" }, { "key": 242, "value": "Noise pop" }, { "key": 243, "value": "Noise rock" }, { "key": 244, "value": "Noise" }, { "key": 245, "value": "Noisegrind" }, { "key": 246, "value": "Nortec" }, { "key": 247, "value": "Novelty ragtime" }, { "key": 248, "value": "Nu jazz" }, { "key": 249, "value": "Nu metal" }, { "key": 250, "value": "Nu skool breaks" }, { "key": 251, "value": "Nu-disco" }, { "key": 252, "value": "Oldschool jungle" }, { "key": 253, "value": "Orchestral jazz" }, { "key": 254, "value": "Orchestral Uplifting" }, { "key": 255, "value": "Paisley Underground" }, { "key": 256, "value": "Pop punk" }, { "key": 257, "value": "Pop rock" }, { "key": 258, "value": "Post-bop" }, { "key": 259, "value": "Post-Britpop" }, { "key": 260, "value": "Post-disco" }, { "key": 261, "value": "Post-grunge" }, { "key": 262, "value": "Post-hardcore" }, { "key": 263, "value": "Post-metal" }, { "key": 264, "value": "Post-punk revival" }, { "key": 265, "value": "Post-punk" }, { "key": 266, "value": "Post-rock" }, { "key": 267, "value": "Power electronics" }, { "key": 268, "value": "Power metal" }, { "key": 269, "value": "Power noise" }, { "key": 270, "value": "Power pop" }, { "key": 271, "value": "Powerviolence" }, { "key": 272, "value": "Progressive breaks" }, { "key": 273, "value": "Progressive drum & bass" }, { "key": 274, "value": "Progressive folk" }, { "key": 275, "value": "Progressive house" }, { "key": 276, "value": "Progressive metal" }, { "key": 277, "value": "Progressive rock" }, { "key": 278, "value": "Progressive techno" }, { "key": 279, "value": "Progressive" }, { "key": 280, "value": "Psybreaks" }, { "key": 281, "value": "Psychedelic folk" }, { "key": 282, "value": "Psychedelic rock" }, { "key": 283, "value": "Psychedelic trance" }, { "key": 284, "value": "Psychobilly" }, { "key": 285, "value": "Psyprog" }, { "key": 286, "value": "Punk jazz" }, { "key": 287, "value": "Punk rock" }, { "key": 288, "value": "Raga rock" }, { "key": 289, "value": "Ragga-jungle" }, { "key": 290, "value": "Raggacore" }, { "key": 291, "value": "Ragtime" }, { "key": 292, "value": "Rap metal" }, { "key": 293, "value": "Rap rock" }, { "key": 294, "value": "Rapcore" }, { "key": 295, "value": "Riot grrrl" }, { "key": 296, "value": "Rock and roll" }, { "key": 297, "value": "Rock in Opposition" }, { "key": 298, "value": "Sadcore" }, { "key": 299, "value": "Sambass" }, { "key": 300, "value": "Screamo" }, { "key": 301, "value": "Shibuya-kei" }, { "key": 302, "value": "Shoegaze" }, { "key": 303, "value": "Ska jazz" }, { "key": 304, "value": "Ska punk" }, { "key": 305, "value": "Skate punk" }, { "key": 306, "value": "Skweee" }, { "key": 307, "value": "Slowcore" }, { "key": 308, "value": "Sludge metal" }, { "key": 309, "value": "Smooth jazz" }, { "key": 310, "value": "Soft rock" }, { "key": 311, "value": "Soul jazz" }, { "key": 312, "value": "Sound art" }, { "key": 313, "value": "Southern rock" }, { "key": 314, "value": "Space disco" }, { "key": 315, "value": "Space house" }, { "key": 316, "value": "Space rock" }, { "key": 317, "value": "Speed garage" }, { "key": 318, "value": "Speed metal" }, { "key": 319, "value": "Speedcore" }, { "key": 320, "value": "Stoner rock" }, { "key": 321, "value": "Straight-ahead jazz" }, { "key": 322, "value": "Street punk" }, { "key": 323, "value": "Stride jazz" }, { "key": 324, "value": "Sufi rock" }, { "key": 325, "value": "Sung poetry" }, { "key": 326, "value": "Suomisaundi" }, { "key": 327, "value": "Surf rock" }, { "key": 328, "value": "Swing house" }, { "key": 329, "value": "Swing" }, { "key": 330, "value": "Symphonic metal" }, { "key": 331, "value": "Synthcore" }, { "key": 332, "value": "Synthpop" }, { "key": 333, "value": "Synthpunk" }, { "key": 334, "value": "Tech house" }, { "key": 335, "value": "Tech trance" }, { "key": 336, "value": "Technical death metal" }, { "key": 337, "value": "Techno-DNB" }, { "key": 338, "value": "Techno-folk" }, { "key": 339, "value": "Techno" }, { "key": 340, "value": "Technopop" }, { "key": 341, "value": "Techstep" }, { "key": 342, "value": "Tecno brega" }, { "key": 343, "value": "Terrorcore" }, { "key": 344, "value": "Third stream" }, { "key": 345, "value": "Thrash metal" }, { "key": 346, "value": "Thrashcore" }, { "key": 347, "value": "Toytown Techno" }, { "key": 348, "value": "Trad jazz" }, { "key": 349, "value": "Traditional doom" }, { "key": 350, "value": "Trance" }, { "key": 351, "value": "Trap" }, { "key": 352, "value": "Tribal house" }, { "key": 353, "value": "Trip hop" }, { "key": 354, "value": "Turbofolk" }, { "key": 355, "value": "Twee Pop" }, { "key": 356, "value": "Uplifting trance" }, { "key": 357, "value": "Vaporwave" }, { "key": 358, "value": "Viking metal" }, { "key": 359, "value": "Vocal house" }, { "key": 360, "value": "Vocal jazz" }, { "key": 361, "value": "Vocal trance" }, { "key": 362, "value": "West Coast jazz" }, { "key": 363, "value": "Western" }, { "key": 364, "value": "Witch House/Drag" }, { "key": 365, "value": "World fusion" }, { "key": 366, "value": "Worldbeat" }, { "key": 367, "value": "Yacht rock" }, { "key": 368, "value": "Yorkshire Bleeps and Bass" }]

    const UpdateGenres = () => {
        editGenres(user.email, selected);
        navigation.navigate("Profile")
    }

    return (
        <KeyboardAvoidingView
            styles={styles.container}
            behaviour="padding">
            <View style={styles.mainContainer}>
                <ProfileEditHeader title="Edit Genres"></ProfileEditHeader>

                <Text style={styles.tip}>Please select your favourite genres</Text>

                <MultipleSelectList
                    setSelected={(val) => setSelected(val)}
                    data={data}
                    save="value"
                    label="Instruments"
                />
                <Pressable style={styles.nextButton} onPress={UpdateGenres}>
                    <Text style={styles.nextButtonText}>Confirm Changes</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ProfileEditGenres

const styles = StyleSheet.create({
    mainContainer: {
        padding: 15,
        backgroundColor: "white",
        height: "100%"
    },
    pageTitle: {
        fontSize: 30,
        fontFamily: "Cormorant Garamond",
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 50
    },
    loginInput: {
        marginBottom: 15,
        borderWidth: 2,
        borderColor: "#36383b",
        fontWeight: "bold",
        fontSize: 16,
        height: 50,
        paddingLeft: 20,
        borderRadius: 10,
    },
    tip: {
        marginBottom: 20
    },
    genderDropdown: {
        backgroundColor: "white",
        width: '100%',
        marginBottom: 15,
        borderWidth: 2,
        borderColor: "#36383b",
        fontWeight: "bold",
        fontSize: 16,
        height: 50,
        paddingLeft: 20,
        borderRadius: 10,
    },
    nextButton: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#36383b',
        padding: 18,
        borderRadius: 100,
        backgroundColor: "#36383b",
        marginTop: 50,
    },
    nextButtonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'

    },
    loginButton: {
        marginTop: 5,
        textAlign: 'right'
    },
    loginButtonText: {
        textAlign: 'right',
        fontFamily: "Cormorant Garamond",
        fontSize: 25,
        fontWeight: '600',
        textDecorationLine: 'underline'

    },
    otherSignInText: {
        fontFamily: "Cormorant Garamond",
        textAlign: 'center',
        fontSize: 20
    },
    logo: {
        marginBottom: 40,
        width: 280,
        height: 200,
        marginLeft: 50,
        resizeMode: 'contain'
    },
    info: {
        color: "red",
        marginTop: 20,
        marginBottom: 20
    },

})