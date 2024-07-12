package com.example.backend.controller;



import com.example.backend.dto.ChatGPTRequest;
import com.example.backend.dto.ChatGPTResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin("*")
@Tag(name = "데이터 정형화", description = "입력된 데이터를 정형화된 데이터로 변경합니다.")
public class CustomBotController {
    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiURL;

    @Autowired
    private RestTemplate template;

    @GetMapping("/normalization/amount")    //금액 정형화
    @Operation(summary = "금액 정형화", description = "입력값 예시 : 2만8천610원입니다. ")
    public String amountNormalization(@RequestParam(name = "data") String data) {
        String order = "{\"amount\" : \"127,000\" }\n" +
                "String 데이터를 위 형식의 JSON형태의 데이터를 응답해줘야된다. 아래의 유의 사항을 지켜서 만들어줘.\n" +
                "1. 이만오천원 이 들어오면, { \"amount\" : \"25,000\" }\n" +
                "2. 25000 보내주세요 이 들어오면, { \"amount\" : \"25,000\" }\n" +
                "3. 2천 삼백 오 십원 이 들어오면 { \"amount\" : \"2,350\" }\n" +
                "4. 니가 한국 금액 표시를 콤마로 해줘야되 예를 들면 250000이면 { \"amount\" : \"250,000\"} 이렇게" +
                "4. 리턴할 데이터 형식에서 앞에 ```json을 붙히지마. \n" +
                "5. 니가 준데이터를 바로 API로 넘겨줄거기 떄문에 리턴할 데이터 형식에서 앞에 json을 붙히지마. \n" +
                "네가 정형화해야 할 데이터는 다음과 같아. Json형식의 데이터를 리턴해줘 " + data;
        ChatGPTRequest request = new ChatGPTRequest(model, order);
        ChatGPTResponse chatGPTResponse = template.postForObject(apiURL, request, ChatGPTResponse.class);

        return chatGPTResponse.getChoices().get(0).getMessage().getContent();
    }

    @GetMapping("/normalization/accountNumber")    //계좌번호 정형화
    @Operation(summary = "계좌번호 정형화", description = "입력값 예시 : 부산은행 888에 4444에 2216에 99입니다.")
    public String accountNumberNormalization(@RequestParam(name = "data") String data) {
        String order = "{ \"accountNumber\" : \"111-2222-3333-45\", \"bank\" : \"부산\" }\n" +
                "String 데이터를 위 형식의 JSON형태의 데이터를 응답해줘야된다. 아래의 유의 사항을 지켜서 만들어줘.\n" +
                "1. 신한은행 일일일-이이이이-삼삼삼삼-사오 이 들어오면 한글을 숫자로 유추해서 만들어야된다, { \"accountNumber\" : \"111-2222-3333-45\", \"bank\" : \"신한\" }\n" +
                "2. 은행이름이랑 숫자와 '-' 문자 제외하고 전부 없애 주라, 그 예시로 하나 123-456-만asvs12-45 이 들어오면 { \"accountNumber\" : \"123-456-12-45\", \"bank\" : \"하나\" }\n" +
                "3. 숫자와 '-' 문자는 절대로 바꾸면 안된다. \n" +
                "4. 공백이 있으면 '-'를 절대로 넣지말고 그냥 붙혀서 해줘. 그 예시로 1 2 3 - 1 은 {\"accountNumber\" : \"123-1\" }" +
                "5. 리턴할 데이터 형식에서 앞에 ```json을 붙히지마. \n" +
                "6. 니가 준데이터를 바로 API로 넘겨줄거기 떄문에 리턴할 데이터 형식에서 앞에 ```json을 붙히지마 진짜 부탁이야." +
                "\n" +
                "네가 정형화해야 할 데이터는 다음과 같아. Json형식의 데이터를 리턴해줘 " + data;
        ChatGPTRequest request = new ChatGPTRequest(model, order);
        ChatGPTResponse chatGPTResponse = template.postForObject(apiURL, request, ChatGPTResponse.class);
        return chatGPTResponse.getChoices().get(0).getMessage().getContent();
    }

    @GetMapping("/normalization/menu")    //계좌번호 정형화
    @Operation(summary = "메뉴 정형화", description = "입력값 예시 : 이체 할거야.")
    public String chatBot(@RequestParam(name = "data") String data) {
        String order = "너는 지금부터 사람들이 불러주는 비정형 데이터를 정형 데이터로 변경해야 해. 비정형 데이터에서 데이터가 포함되면 리턴하게 해줘. 리턴(response)은 이체, 계좌조회, 거래내역 json으로 리턴을 부탁해. 여기 몇 가지 예시가 있어.\\n\" +\n" +
                "                \"1. 이체 할거야 가 들어오면, { menu : '이체' }\\n\" +\n" +
                "                \"2. 거래 조회 부탁합니다, { menu : '거래조회' }\n" +
                "3. 거래내역 이 들어오면 { menu : '거래내역' }\n" +
                "\n" +
                "네가 정형화해야 할 데이터는 다음과 같아. 결과값만 json으로 리턴해줘" + data;
        ChatGPTRequest request = new ChatGPTRequest(model, order);
        ChatGPTResponse chatGPTResponse = template.postForObject(apiURL, request, ChatGPTResponse.class);
        return chatGPTResponse.getChoices().get(0).getMessage().getContent();
    }
}