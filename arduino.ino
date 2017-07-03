float ch = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
for(int i = 0; i<400; i++){
    Serial.println(i);
    delay(10);
  }
  delay(2000);
}
