
/*[ User Interaction / UI Layer ]
               │
               ▼ (1. Triggers Event Handler)
     [ Dispatch Action ]
               │
               ▼ (2. Sends Action with Payload)
      [ Redux Store ]
               │
               ▼ (3. Passes Current State + Action)
        [ Reducer ]
               │
               ▼ (4. Returns Immutable New State)
   [ State Updated in Store ]
               │
               ▼ (5. Notifies Subscribed Components)
  [ UI Re-renders / Views Update ]


### ১. ইউজার ইন্টারঅ্যাকশন (UI Layer & Event Handlers)

* **কী ঘটে:** ইউজার ইন্টারফেসে (UI) কোনো অ্যাকশন তৈরি করেন (যেমন: বাটনে ক্লিক করা, ইনপুট ফিল্ডে টাইপ করা বা ফর্ম সাবমিট করা)।
* **কাজ:** UI-এর **Event Handler** (যেমন `onClick`, `onSubmit`) ইউজার ইনপুট বা কাজটিকে ক্যাচ করে।

### ২. অ্যাকশন ডিসপ্যাচ করা (Dispatching Action)

* **কী ঘটে:** Event Handler একটি **Action** তৈরি করে Redux Store-এ পাঠায় (`dispatch(action)`)।
* **Action কী:** এটি একটি সাধারণ JavaScript Object, যার দুটি মূল অংশ থাকে:
* `type`: কাজের বিবরণ (যেমন: `'counter/increment'`)
* `payload`: কাজের জন্য প্রয়োজনীয় ডাটা (যেমন: `{ amount: 5 }`)



### ৩. রিডিউসারের কাছে অ্যাকশন পৌঁছানো (Redux Store & Reducers)

* **কী ঘটে:** Redux Store ডিসপ্যাচ হওয়া Action এবং বর্তমান স্টেট (`currentState`) কে **Reducer** ফাংশনের কাছে পাঠিয়ে দেয়।
* **Reducer কী:** এটি একটি Pure Function যা দুটি ইনপুট নেয় (বর্তমান State এবং Action) এবং হিসাব-নিকাশ করে একটি **সম্পূর্ণ নতুন State** রিটার্ন করে।

### ৪. স্টেট আপডেট (State Update)

* **কী ঘটে:** Reducer থেকে পাওয়া নতুন স্টেটটি Redux Store-এ সংরক্ষিত হয়।
* **বৈশিষ্ট্য:** Redux সরাসরি আগের স্টেট মিউটেট (পরিবর্তন) করে না, বরং নতুন একটি স্টেট তৈরি করে আগেরটিকে রিপ্লেস করে।

### ৫. UI রি-রেন্ডারিং (UI Re-render)

* **কী ঘটে:** UI Layer (যেমন React components) Redux Store-এর সাথে কানেক্টেড বা সাবস্ক্রাইব করা থাকে (যেমন `useSelector` হুক দিয়ে)।
* **ফলাফল:** Store-এর স্টেট পরিবর্তন হওয়া মাত্রই UI স্বয়ংক্রিয়ভাবে নতুন ডাটা রিসিভ করে এবং স্ক্রিনে আপডেট হয়ে রি-রেন্ডার হয়।

---

## 💻 একটি সহজ উদাহরণ (Code Scenario)

১. **UI-তে ক্লিক:** ইউজার **"Add to Cart"** বাটনে ক্লিক করলেন।
২. **Action Dispatch:**


dispatch({ type: 'cart/addItem', payload: { id: 1, name: 'Laptop' } });



৩. **Reducer Logic:**


function cartReducer(state = [], action) {
  switch (action.type) {
    case 'cart/addItem':
      return [...state, action.payload]; // নতুন স্টেট রিটার্ন
    default:
      return state;
  }
}



৪. **Store Update:** Store-এর `cart` অ্যারেতে নতুন আইটেমটি যুক্ত হলো।

৫. **UI Update:** কার্ট কাউন্টার বাটনের সংখ্যা ১ বেড়ে গেল এবং স্ক্রিনে নতুন আইটেম প্রদর্শন শুরু হলো।



  */