using AutoMapper;
using Backend.Application.DTOs;
using Backend.Domain.Model;

namespace Backend.Application.Mappers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<users, UserGetDto>();
            CreateMap<users, UserSendDto>();

            // Payment mappings
            CreateMap<payment, PaymentDto>()
                .ForMember(dest => dest.user_name, opt => opt.MapFrom(src => src.user.nev))
                .ForMember(dest => dest.user_email, opt => opt.MapFrom(src => src.user.email));
            CreateMap<CreatePaymentDto, payment>()
                .ForMember(dest => dest.payment_date, opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(dest => dest.id, opt => opt.Ignore());
        }
    }
}
