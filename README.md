# MP Blog Frontend

Front End of Blog App! This application provides a user interface for interacting with the backend API to manage blog posts, comments and user authentication.

## Features
- **User Authentication:** Allows users to register an account and log in securely.

- **Create and Manage Blog Posts:** Authenticated users can create, edit, and delete their blog posts.

- **Create Comments:** Authenticated users can create comments in a blog post.

- **View All Blog Posts:** Displays a list of all blog posts on the landing page.

- **Update User Profile:** Users can update their profile by changing their avatar and/or bio.

## Technologies Used
- **TypeScript**
- **React.js:** The frontend is built using the React.js library for building user interfaces.

- **Next.js:** Next.js is used for server-side rendering and routing.

- **Tailwind CSS:** Tailwind CSS is used for styling the components with utility-first CSS classes.

- **React useFormState:** React useFormState is used for form handling and validation.

- **Next.js Image:** Next.js Image is used for optimizing and lazy-loading images.

- **Fetch API:** The Fetch API is used to make HTTP requests to the backend API endpoints.

## Future Improvements
Features to be implemented

- **Enabling searching and filtering posts**
- **Enabling Authenticated users to like postes**
- **Enabling authenticated users save posts to their favorite**

## Getting Started
To run the application locally, follow these steps:

- Clone this repository:
```bash
    git clone <repository-url>
```
Install dependencies
```bash
npm install
```

- Set up environment variables by creating a .env.local file and adding the necessary variables (e.g., API_URL for the backend API URL).

- Run the development server using npm run dev.

## Folder Structure
```csharp

MP-Blog-Client/
│
├── app/                # Next.js App router
├── app/components/     # Components
├── app/forms/          # Form components
├── app/actions         # Next.js server actions
├── globals.css/        # CSS stylesheets
├── public/             # Static assets
└── 
```

## Deployment
The application can be deployed to various platforms like Vercel, Netlify. Make sure to set up environment variables for production deployment.

## Contributing
Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## Contributing
[Sitota Alemu](https://github.com/Uwancha)

## License
This project is licensed under the MIT License - see the LICENSE file for details.