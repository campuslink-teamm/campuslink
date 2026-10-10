# CampusLink

**CampusLink** – universitetinis komandinis projektas: internetinė platforma, padedanti studentams atrasti bendras veiklas ir susirasti bendraminčių.

Pavyzdžiui, studentas gali paskelbti: „18:00 bėgu palei Nerį – kas norėtų prisijungti?“ Kiti studentai gali peržiūrėti skelbimą ir išreikšti norą dalyvauti.

> **Būsena:** projektas kuriamas. Funkcionalumas ir technologijos dar gali keistis.

## Projekto tikslas

Sukurti veikiančią internetinės platformos pradinę versiją (**MVP**), apimančią naudotojo sąsają (*frontend*), serverio dalį (*backend*), duomenų bazę ir veikiančią demonstracinę aplinką.

**Komanda:** 5 studentai.  
**Siekiamas projekto užbaigimas:** 2026 m. gruodžio 17 d.  
**Galutinis atsiskaitymas:** numatomas 2027 m. sausio pabaigoje.

## Planuojamos MVP funkcijos

- [ ] Naudotojo registracija, prisijungimas ir atsijungimas.
- [ ] Veiklos skelbimo sukūrimas (pavadinimas, aprašymas, laikas, vieta).
- [ ] Veiklų sąrašo ir pasirinktos veiklos informacijos peržiūra.
- [ ] Galimybė išreikšti norą prisijungti prie veiklos.
- [ ] Savo skelbimų redagavimas ir šalinimas.

**Papildomos galimybės, jei liks laiko:** veiklų paieška ir filtrai, išsamesnis naudotojo profilis, pranešimai ar susirašinėjimas. Galutinę apimtį suderinsime komandoje.

## Projekto etapai ir terminai

| Etapas | Turinys |
| --- | --- |
| **1. Inicijavimas** | Projekto tikslas, apimtis, komandos planas ir darbo aplinkos. |
| **2. Reikalavimai ir projektavimas** | Funkciniai reikalavimai, Figma prototipas, diagramos ir duomenų modelis. |
| **3. Sistemos kūrimas** | Frontend, backend, duomenų bazė, funkcijų integravimas ir diegimas. |
| **4. Testavimas** | Funkcionalumo, duomenų tikrinimo, saugumo ir naudojimo patogumo testai. |
| **5. Projekto užbaigimas** | Dokumentacija, galutinė demonstracija ir atsiskaitymas. |

**Artimiausi universiteto pristatymai:**

- **2026-10-16** – prototipo pristatymas.
- **2026-10-23** – pasirinktų technologijų (*tech stack*) pristatymas.
- **2026-12-17** – siekiamas projekto darbų užbaigimas.
- **2026-12-18** – planuojamas pristatymas paskaitoje, jeigu projektas bus paruoštas.

## Naudojami įrankiai

| Įrankis | Paskirtis |
| --- | --- |
| [Linear](https://linear.app/campuslink-team/project/campuslink-24c53e346074) | Užduotys, atsakomybės, terminai ir projekto eiga. |
| [GitHub](https://github.com/campuslink-team/campuslink) | Programinio kodo versijos, darbo šakos ir *pull requests*. |
| **Discord** | Komandos susitikimai, klausimai ir kasdienis bendravimas (prisijungimo nuoroda – iš komandos). |
| **Figma** | Dizainas ir interaktyvus prototipas (nuoroda bus pridėta gavus ją iš dizainą kuriančio nario). |

## Technologijos

Technologijų rinkinys **dar nepatvirtintas**. Komanda iki spalio 23 d. pasirinks ir pristatys:

- **Frontend:** bus patikslinta.
- **Backend:** bus patikslinta.
- **Duomenų bazė:** bus patikslinta.
- **Serveris / talpinimas:** bus patikslinta.

Pasirinkę technologijas, šioje vietoje papildysime ir projekto paleidimo instrukciją.

## Kaip dirbame su kodu

1. Pasirenkame ir sau priskiriame užduotį **Linear** (pvz., `CAM-30`).
2. Kuriame atskirą Git šaką, kurios pavadinimas prasideda užduoties numeriu (pvz., `cam-30-login-page`).
3. Atliekame pakeitimus savo šakoje, o ne tiesiogiai `main`.
4. GitHub sukuriame **Pull Request (PR)** ir aprašyme nurodome Linear užduotį, pvz., `CAM-30`.
5. Kitas komandos narys peržiūri PR; po suderinimo pakeitimus sujungiame į `main`.
6. Atnaujiname užduoties būseną Linear (arba patikriname integracijos atnaujinimą).

`main` laikome pagrindine stabilia kodo versija. **Slaptažodžių, prisijungimo raktų ir `.env` failų su paslaptimis į GitHub nekeliame.**

## Kaip pradėti dirbti

1. Gaukite prieigą prie **GitHub organizacijos**, šios saugyklos, **Linear** projekto ir **Discord** serverio.
2. Peržiūrėkite Linear užduočių sąrašą ir su komanda susitarkite dėl atsakomybių.
3. GitHub saugyklą galima parsisiųsti komanda:

   ```bash
   git clone https://github.com/campuslink-team/campuslink.git
   ```

4. Kol neparinktos technologijos, **projekto paleidimo komandų nėra**. Jas pridėsime sukūrę pirmą veikiančią frontend ir backend versiją.

## Projekto dokumentacija

Vystymo metu rengiami: *Project Charter*, projekto apimties ir darbų planas, funkcinių reikalavimų aprašymas, **Use Case**, **Class / Data Model**, **Navigation**, **Deployment** ir **Activity** diagramos, duomenų laukų specifikacija, prototipas bei testavimo rezultatai.

Aktualios užduotys ir jų atlikimo kriterijai pateikiami [CampusLink projekte Linear](https://linear.app/campuslink-team/project/campuslink-24c53e346074).

---

*Tai mokomasis universitetinis projektas. Šis README bus atnaujinamas vystant sistemą.*
