use reqwest::Error;

pub struct SpotifyApiClient {
  client_id: String,
  redirect_uri: String,
  authorization_code: Option<String>,
  http_client: Client,
}

impl SpotifyApiClient {
  pub fn new(client_id: String, redirect_uri: String) -> Self {
      Self {
          client_id,
          redirect_uri,
          authorization_code: None,
          http_client: Client::new(),
      }
  }

  pub async fn get_authorization(&self) -> Result<String, Box<dyn Error>> {
    let state = self.generate_random_string(16);
    let scope = "user-read-private user-read-email";
    let auth_url = format!("https://accounts.spotify.com/authorize?response_type=code&client_id={}&scope={}&redirect_uri={}&state={}",
                            self.client_id,
                            &scope,
                            urlencoding::encode(&self.redirect_uri),
                            state);

    let response = reqwest::get(&auth_url).await?.text().await?;
    let authorization_response: AuthorizationResponse = serde_json::from_str(&response)?;
    Ok(authorization_response.code)
  }

  fn generate_random_string(&self, length: usize) -> String {
      let mut rng = rand::thread_rng();
      let characters: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      (0..length)
          .map(|_| {
              let idx = rng.gen_range(0..characters.len());
              characters[idx] as char
          })
          .collect()
  }
}