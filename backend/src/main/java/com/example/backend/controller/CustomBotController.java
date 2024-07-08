package com.example.backend.controller;



import com.example.backend.dto.ChatGPTRequest;
import com.example.backend.dto.ChatGPTResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
        String order = "너는 지금부터 사람들이 불러주는 비정형 데이터를 정형 데이터로 변경해야 해. 비정형 데이터는 계좌에서 전송할 금액일거고 리턴(response)은 숫자를 가진 json으로 부탁해. 여기 몇 가지 예시가 있어.\n" +
                "1. 이만오천원 이 들어오면, { amount : 25000 }\n" +
                "2. 25000 보내주세요 이 들어오면, { amount : 25000 }\n" +
                "3. 2천 삼백 오 십원 이 들어오면 { amount : 2350 }\n" +
                "\n" +
                "네가 정형화해야 할 데이터는 다음과 같아. 결과값만 json으로 리턴해줘\n"+ data;
        ChatGPTRequest request = new ChatGPTRequest(model, order);
        ChatGPTResponse chatGPTResponse = template.postForObject(apiURL, request, ChatGPTResponse.class);
        return chatGPTResponse.getChoices().get(0).getMessage().getContent();
    }

    @GetMapping("/normalization/accountNumber")    //계좌번호 정형화
    @Operation(summary = "계좌번호 정형화", description = "입력값 예시 : 부산은행 888에 4444에 2216에 99입니다.")
    public String accountNumberNormalization(@RequestParam(name = "data") String data) {
        String order = "너는 지금부터 사람들이 불러주는 비정형 데이터를 정형 데이터로 변경해야 해. 비정형 데이터는 계좌번호일거고 리턴(response)은 YYY-ZZZZ-ZZZZ-ZC (13자리) 체계를 가진 json으로 부탁해. 여기 몇 가지 예시가 있어.\n" +
                "1. 일일일이이이이삼삼삼삼사오 이 들어오면, { accountNumber : 111-2222-3333-45 }\n" +
                "2. 삼삼삼에 이이이이 다시 오오오오에 칠 육  이 들어오면, { accountNumber : 333-2222-5555-76}\n" +
                "3. 부산은행 887에 6662에 9999 다시 팔사 입니다 이 들어오면 { accountNumber : 887-6662-9999-84 }\n" +
                "\n" +
                "네가 정형화해야 할 데이터는 다음과 같아. 결과값만 json으로 리턴해줘" + data;
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