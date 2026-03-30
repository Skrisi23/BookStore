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
                .ForMember(dest => dest.user_email, opt => opt.MapFrom(src => src.user.email))
                .ForMember(dest => dest.items, opt => opt.MapFrom(src => src.purchase_items));
            CreateMap<purchase_item, PurchaseItemDto>()
                .ForMember(dest => dest.book_title, opt => opt.MapFrom(src => src.book != null ? src.book.cim : null));
            CreateMap<CreatePaymentDto, payment>()
                .ForMember(dest => dest.payment_date, opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(dest => dest.id, opt => opt.Ignore());            // Rental mappings
            CreateMap<rental, RentalDto>()
                .ForMember(dest => dest.user_name, opt => opt.MapFrom(src => src.user != null ? src.user.nev : null))
                .ForMember(dest => dest.user_email, opt => opt.MapFrom(src => src.user != null ? src.user.email : null))
                .ForMember(dest => dest.book_title, opt => opt.MapFrom(src => src.copy != null && src.copy.book != null ? src.copy.book.cim : null))
                .ForMember(dest => dest.book_id, opt => opt.MapFrom(src => src.copy != null ? src.copy.book_id : (int?)null))
                .ForMember(dest => dest.payment_id, opt => opt.MapFrom(src => src.payment_id));

            // Cart mappings
            CreateMap<cart, CartDto>()
                .ForMember(dest => dest.user_name, opt => opt.MapFrom(src => src.user.nev))
                .ForMember(dest => dest.user_email, opt => opt.MapFrom(src => src.user.email))
                .ForMember(dest => dest.items, opt => opt.MapFrom(src => src.cart_items))
                .ForMember(dest => dest.total_price, opt => opt.MapFrom(src => src.cart_items.Sum(ci => ci.price * ci.quantity)))
                .ForMember(dest => dest.total_items, opt => opt.MapFrom(src => src.cart_items.Sum(ci => ci.quantity)));
            CreateMap<CreateCartDto, cart>()
                .ForMember(dest => dest.created_at, opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(dest => dest.status, opt => opt.MapFrom(src => "active"))
                .ForMember(dest => dest.id, opt => opt.Ignore());

            // CartItem mappings
            CreateMap<cart_item, CartItemDto>()
                .ForMember(dest => dest.leltari_szam, opt => opt.MapFrom(src => src.copy.leltari_szam))
                .ForMember(dest => dest.copy_elerheto, opt => opt.MapFrom(src => src.copy.elerheto))
                .ForMember(dest => dest.book_id, opt => opt.MapFrom(src => src.copy.book.id))
                .ForMember(dest => dest.book_cim, opt => opt.MapFrom(src => src.copy.book.cim))
                .ForMember(dest => dest.book_boritokep, opt => opt.MapFrom(src => src.copy.book.boritokep))
                .ForMember(dest => dest.book_kategoria, opt => opt.MapFrom(src => src.copy.book.category.name))
                .ForMember(dest => dest.author_nev, opt => opt.MapFrom(src => src.copy.book.author.nev));
            CreateMap<AddToCartDto, cart_item>()
                .ForMember(dest => dest.added_at, opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(dest => dest.quantity, opt => opt.MapFrom(src => 1))
                .ForMember(dest => dest.id, opt => opt.Ignore())
                .ForMember(dest => dest.cart_id, opt => opt.Ignore())
                .ForMember(dest => dest.price, opt => opt.Ignore());
        }
    }
}
