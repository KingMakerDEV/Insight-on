import os


class FileValidator:

    ALLOWED_EXTENSIONS = {"csv"}

    @staticmethod
    def validate_file(filename: str):

        if not filename:
            raise ValueError("No file provided.")

        if "." not in filename:
            raise ValueError("Invalid file format.")

        extension = filename.rsplit(".", 1)[1].lower()

        if extension not in FileValidator.ALLOWED_EXTENSIONS:
            raise ValueError("Only CSV files are allowed.")

    @staticmethod
    def ensure_upload_folder(path: str):
        if not os.path.exists(path):
            os.makedirs(path)
