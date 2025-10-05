# Karo

<p align="center">
  <strong>A minimalist, real-time daily logger and time-tracking application.</strong>
</p>

<p align="center">
  <img src="./public/Screenshot 2025-10-05 at 10.49.55 PM.png" alt="Karo Application Screenshot" width="700">
</p>

---

## ✨ Key Features

-   **Real-time Logging:** Instantly log your tasks, notes, and time throughout the day.
-   **Secure Authentication:** User accounts and data are kept secure with Supabase authentication.
-   **Inline Editing:** Quickly click and edit any entry directly in the table.
-   **Colored Tags:** Organize your logs with customizable, color-coded tags for easy categorization.
-   **Minimalist UI:** A clean, beautiful, and focused interface designed to minimize distractions.
-   **Automatic Timestamps:** New entries are automatically timestamped for convenience.

## 🚀 Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Backend & Auth:** [Supabase](https://supabase.io/)
-   **Icons:** [React Icons](https://react-icons.github.io/react-icons/)

## 🛠️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (v18 or later recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/karo.git
    cd karo
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of your project and add your Supabase project credentials. You can find these in your Supabase project's dashboard under `Settings` > `API`.

    ```env
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---