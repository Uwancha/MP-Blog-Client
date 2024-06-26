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

## UI Design(Figma)
You will find a simple UI design of the app [here](https://www.figma.com/file/DCuEtItcMA6HinZgzXEfC3/MyProff?type=design&node-id=1%3A86&mode=design&t=gFaDbhvvJJchKnpU-1)

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

- **Alternatively:** you can download the zip file, extract it and follow the next steps.


- Set up environment variables by creating a .env.local file and adding the necessary variables (API_URL for the backend API URL).

- Run the development server using npm run dev.
```bash
npm run dev
```

I used Next.js app router. If you are not familiar with app router(If you've been using page router), take a quick look at it here [Next.js-App-Router-Docs](https://nextjs.org/docs)

## Folder Structure
```csharp

MP-Blog-Client/
│
├── app/                        # Next.js App router
├── app/actions/                # Next.js server actions
├── app/components/             # Form components
├── app/createpost              # Post creating page
├── app/forms                   # Form components
├── app/login                   # Login page component
├── app/posts/                  # Dynamic Post detail page
├── app/profile/                # User profile page 
├── app/register/               # User registration page component
├── app/page.tsx                # Home/Landing page component
├── globals.css/                # Global custom css classes
├── public/                     # Static assets
├── README.md                   # Project README and others
└── 
```

## Deployment
The application can be deployed to various platforms like Vercel, Netlify. Make sure to set up environment variables for production deployment.

## Contributing
Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## Contributer
[Sitota Alemu](https://github.com/Uwancha)

## License
This project is licensed under the MIT License.