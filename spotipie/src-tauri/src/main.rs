// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

//     const CLIENT_ID: &str = "1d41a7bc4b7e491eb7951830ba5d4756";
//     const CLIENT_SECRET: &str = "efc9df2be7b54103b3a7c16602c4b29e";

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
