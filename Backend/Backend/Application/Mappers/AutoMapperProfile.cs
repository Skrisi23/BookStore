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
        }
    }
}
