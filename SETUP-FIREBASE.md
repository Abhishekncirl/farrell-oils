# Firebase setup: customer enquiries + admin

The website code is ready. These one-off steps create the cloud database and the
admin login, then connect them to the live site. About 15 minutes, all in a web
browser. **No credit card needed:** this uses only Firestore and Authentication,
which are covered by the free Spark plan.

- Live site: https://abhishekncirl.github.io/farrell-oils/
- Admin: https://abhishekncirl.github.io/farrell-oils/admin
- Repo: https://github.com/Abhishekncirl/farrell-oils

## How it works

- Customers fill in **Contact → Send us an enquiry** or **Get a Quote**.
- Each submission is saved to the Firestore collection `enquiries`.
- Staff sign in at `/admin` to view, search, filter, add notes, mark as
  read/actioned, delete, and export to CSV (Excel).
- Staff change the opening hours in **Admin → Settings**; the website footer and
  Contact page update straight away (stored in Firestore at `settings/site`).
- `firestore.rules` lets anyone *submit* an enquiry, but only the admin email
  addresses listed in it can *read* them.

## 1. Create the Firebase project
1. Go to https://console.firebase.google.com and sign in with a Google account.
2. **Create a project** → name it `farrell-oils` → Google Analytics can be off.

## 2. Register a web app and copy its config
1. On the project overview, click the **`</>` Web** icon.
2. Nickname: `farrell-oils-web`. Leave "Firebase Hosting" unticked. **Register app**.
3. Copy these four values from the `firebaseConfig` block shown:

   | firebaseConfig field | GitHub secret name |
   |---|---|
   | `apiKey` | `VITE_FIREBASE_API_KEY` |
   | `authDomain` | `VITE_FIREBASE_AUTH_DOMAIN` |
   | `projectId` | `VITE_FIREBASE_PROJECT_ID` |
   | `appId` | `VITE_FIREBASE_APP_ID` |

   These are public by design: they identify the project, they do not unlock it.

## 3. Create the Firestore database
1. **Build → Firestore Database → Create database**.
2. Location: **`eur3 (europe)`** or **`europe-west2 (London)`** (close to Ireland,
   cannot be changed later).
3. Start in **production mode**.

## 4. Publish the security rules
1. Open `firestore.rules` from this repo.
2. Check the admin email list in `isAdmin()` (currently `farrelloils@gmail.com`). Add more
   staff as extra entries, e.g. `'sean@example.ie', 'office@example.ie'`.
3. In Firebase: **Firestore Database → Rules** tab → delete what's there →
   paste the edited rules → **Publish**.

(Or with the Firebase CLI: `firebase deploy --only firestore:rules`.)

## 5. Turn on admin login
1. **Build → Authentication → Get started**.
2. **Sign-in method** → **Email/Password** → Enable → Save.
3. **Users** tab → **Add user** → the same admin email as in step 4 and a strong
   password. This is the login for `/admin`. There is no public sign-up page.
4. **Settings → Authorized domains → Add domain** → `abhishekncirl.github.io`
   (and later the real domain, once there is one).
5. Recommended: **Settings → User actions** → untick **Enable create (sign-up)**,
   so nobody else can create accounts through Firebase's public API.

## 6. Connect the live site
1. GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**.
2. Add the 4 secrets from step 2 (exact names from the table).
3. **Actions → Deploy to GitHub Pages → Run workflow** (or push any commit).

## 7. Test it
1. Open the live site → **Get a Quote** → send a test request.
2. Open `/admin`, sign in, and check it appears. Delete the test enquiry.

## Local development
Copy `.env.example` to `.env`, fill in the same 4 values, then `npm run dev`.
`.env` is git-ignored.

## Adding or removing an admin
Edit the email list in `firestore.rules`, publish it again (step 4), and add or
delete the user under **Authentication → Users**.

## Updating the rules after a website change
Rules are published from the repo with the Firebase CLI (a dev dependency):

```bash
npx firebase login:add        # once per computer, with the Google account that owns the project
npx firebase login:use <that-account>   # once, inside this folder
npm run deploy:rules
```

The console copy-paste method in step 4 still works if the CLI isn't set up.
