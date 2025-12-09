
const Home = () => {

    return (
        <div style={{
            backgroundColor: "white",
            margin: "40px",
            padding: "20px",
            borderRadius: "12px"
        }}>
            <p>
                A projekt során a frontendhez Reactet, míg a backendhez Java Spring Boot keretrendszert használtam.
                Mindkét oldalon törekedtem a karbantartható, hatékony és újrahasznosítható kódírásra.
                Néhány komponens és oldal esetében a határidő közelsége miatt nem mindenhol sikerült a
                legideálisabb megoldást alkalmaznom, azonban a backend rész hatékonyságával erősen elégedett vagyok.
            </p>

            <p>
                Az alkalmazás egy autónyilvántartó rendszer, ahol a felhasználók kedvenc autóikat kezelhetik.
                A kezdőlapon lehet regisztrálni és bejelentkezni. Minden más oldal elérését a rendszer blokkolja,
                amíg a felhasználó nincs bejelentkezve. A regisztráció beépített validációval rendelkezik.
                Bejelentkezésnél öt sikertelen próbálkozás után a fiók automatikusan zárolásra kerül,
                amelyet kizárólag az admin tud feloldani. Sikeres bejelentkezés után a következő felület fogad:
            </p>

            <img src="/kep1.png" alt="kep1" />

            <p>
                Az új kedvenc autó hozzáadásához a zöld plusz ikonra kell kattintani. Létrehozáskor egy
                lenyíló listából választható ki az autó márkája. A rendszer indulásakor négy alapértelmezett márka
                töltődik fel, ezek közül lehet választani. A márka mező keresésre alkalmas: ha kiválasztasz egy márkát,
                a keresőmező automatikusan kitöltődik, de ha egy karaktert törölsz belőle, a kiválasztott márka
                törlődik, és újra ki kell választani.
                A modell mező ugyanígy működik, de lehetőség van új modell létrehozására is az
                „Add new model” opció segítségével.
                A márka, modell és évjárat megadása kötelező, a szín és üzemanyag típusa opcionális.
                Mentéskor a modell bekerül a modell-szótárba, hogy később újra választható legyen.
            </p>

            <p>
                A létrehozott autó kártyaként jelenik meg. Ha a márkanév ismert, automatikusan a hozzá tartozó
                márkakép jelenik meg. Ha a rendszer nem ismeri fel a márkát, a kártyán a márkanév kezdőbetűje látható.
                A kártyára kattintva egy részletes oldal nyílik meg, ahol az autó adatai módosíthatók, törölhetők,
                illetve kép tölthető fel. A feltöltött képre kattintva nagyított nézetben jelenik meg, ahol
                törlésre is van lehetőség. Egy autó törlésekor a hozzá tartozó képek is automatikusan törlődnek.
            </p>

            <p>
                Amennyiben olyan márkát szeretnél létrehozni, amely nem szerepel az elérhető listában, a fejlécben
                található „Request” gombbal küldhetsz márkajavaslatot az admin számára.
                Kijelentkezni a fejlécben lévő Logout gombbal lehet.
                A My Account oldalon megtekinthető a teljes név, felhasználónév, valamint a feltöltött kedvenc autók száma.
                Innen indítható a fiók törlése is — a rendszer ilyenkor valójában csak deaktiválja a fiókot,
                végleges törlésre csak az admin jogosult.
            </p>

            <p><strong>Admin felület:</strong></p>

            <p>
                A rendszer első indításakor egy admin fiók automatikusan létrejön az adatbázisban:
                <br /> <br />
                <strong>Felhasználónév:</strong> ImTheBestBoss<br />
                <strong>Jelszó:</strong> 1234
            </p>

            <p>
                Bejelentkezés után az admin felhasználókezelő felületre jut.
            </p>

            <img src="/kep2.png" alt="kep2" />

            <p>
                Itt táblázatos formában jelenik meg az összes regisztrált felhasználó.
                Az „Edit” gombbal módosíthatók a felhasználói adatok, beállítható az admin jog,
                a fiók aktív/inaktív állapota, visszaállítható a sikertelen bejelentkezések száma,
                illetve törölhető a fiók.
                A táblázat alatt található „Create New User” gombbal új felhasználó vagy admin hozható létre —
                a jelszóvalidáció ugyanaz, mint a regisztrációnál.
            </p>

            <p>
                A fejlécben található „Requests” oldalon az admin új márkákat hozhat létre,
                illetve kezelheti a felhasználók által beküldött márkajavaslatokat.
                A javaslatok elfogadhatók vagy elutasíthatók.
                Az eredeti elképzelés szerint elfogadáskor a márka automatikusan bekerült volna az adatbázisba,
                de ennek implementálása időhiány miatt még nem készült el.
                Az admin a „Favorite” menüpontban saját kedvenc autókat is létrehozhat, ugyanúgy, mint a felhasználók.
            </p>
        </div>
    );
};

export default Home;