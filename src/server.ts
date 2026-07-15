import app from "./app";

const port = process.env.PORT || 5000;

async function main() {
    try {
        app.listen(port , () => {
            console.log(`Server is running on port: ${port}`);
        })
    } catch (error : any) {
        console.error("Error:", error);
        process.exit(1);
    }
};

main();